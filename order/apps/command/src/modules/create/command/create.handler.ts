import { v4 as uuidv4 } from 'uuid';
import { firstValueFrom } from "rxjs";
import { CreateOrderCommand } from "./create.command";
import { ClientGrpc } from "@nestjs/microservices";
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { ProductStatusEnum } from "@shared/enums/product.enum";
import { ProductQueryServiceClient } from "@shared/proto/product-query.pb";
import { OrderAggregate } from "@command/common/aggregate/order.aggregate";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { PRODUCT_QUERY_SERVICE_NAME } from "@shared/constants/microservice.constant";
import { BadRequestException, Inject, NotFoundException, OnModuleInit } from "@nestjs/common";


@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler implements ICommandHandler<CreateOrderCommand, void>, OnModuleInit {
    private productQueryService: ProductQueryServiceClient

    constructor(
        @Inject(PRODUCT_QUERY_SERVICE_NAME)
        private readonly productClient: ClientGrpc,

        private readonly publisher: EventPublisher,

        private readonly eventSourcingHandler: EventSourcingHandler<OrderAggregate>
    ) { }

    onModuleInit() {
        this.productQueryService = this.productClient.getService<ProductQueryServiceClient>(PRODUCT_QUERY_SERVICE_NAME)
    }

    async execute(command: CreateOrderCommand): Promise<void> {
        const { products } = command

        const aggregate = new OrderAggregate()

        // gRPC implementation to get product by list id will be more optimal
        for (const product of products) {
            const res = await firstValueFrom(this.productQueryService.getProduct({ id: product.id }))

            if (!res?.data) {
                throw new NotFoundException(`Product with id ${product.id} not found`)
            }

            if (res?.data?.status === ProductStatusEnum.Bought) {
                throw new BadRequestException(`Product with id ${product.id} is already bought`)
            }
        }

        aggregate.setId(uuidv4())

        this.publisher.mergeObjectContext(aggregate as any)

        aggregate.created({
            id: aggregate.getId(),
            buyDate: new Date(),
            products: [
                ...products.map(product => ({
                    ...product,
                    id: uuidv4(),
                    product_id: product.id,
                }))
            ]
        })

        await this.eventSourcingHandler.save(aggregate)

        aggregate.commit()
    }
}