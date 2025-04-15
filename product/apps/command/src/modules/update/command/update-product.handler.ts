import { firstValueFrom } from "rxjs";
import { ClientGrpc } from "@nestjs/microservices";
import { EventSourcingHandler } from "nestjs-event-sourcing";
import { UpdateProductCommand } from "./update-product.command";
import { Inject, NotFoundException, OnModuleInit } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { ProductAggregate, ProductUpdatedPayload } from "@command/common/aggregate/product.aggregate";
import { PRODUCT_QUERY_SERVICE_NAME } from "@shared/constants/microservice.constant";
import { GetProductResponse, ProductQueryServiceClient } from "@shared/proto/product-query.proto";


@CommandHandler(UpdateProductCommand)
export class UpdateProductCommandHandler implements ICommandHandler<UpdateProductCommand, void>, OnModuleInit {
    private queryService: ProductQueryServiceClient

    constructor(
        @Inject(PRODUCT_QUERY_SERVICE_NAME)
        private readonly client: ClientGrpc,

        private readonly publisher: EventPublisher,

        private readonly eventSourcingHandler: EventSourcingHandler<ProductAggregate>
    ) { }

    onModuleInit() {
        this.queryService = this.client.getService<ProductQueryServiceClient>(PRODUCT_QUERY_SERVICE_NAME)
    }

    async execute(command: UpdateProductCommand): Promise<void> {
        const response: GetProductResponse = await firstValueFrom(this.queryService.getProduct({ id: command.id }))

        if (!response?.data) {
            throw new NotFoundException(`Product with id ${command.id} not found`)
        }

        const aggregate: ProductAggregate = await this.eventSourcingHandler.getById(ProductAggregate, command.id)

        this.publisher.mergeObjectContext(aggregate as any)

        const updateProductData: ProductUpdatedPayload = {}

        const { name, description, price, status } = command

        if (name) {
            aggregate.setName(name)
            updateProductData.name = name
        }

        if (description) {
            aggregate.setDescription(description)
            updateProductData.description = description
        }

        if (price) {
            aggregate.setPrice(price)
            updateProductData.price = price
        }

        if (status) {
            aggregate.setStatus(status)
            updateProductData.status = status
        }


        if (Object.keys(updateProductData).length > 0) {
            aggregate.setId(command.id)
            aggregate.updated(updateProductData)

            await this.eventSourcingHandler.save(aggregate)

            aggregate.commit()
        }
    }
}