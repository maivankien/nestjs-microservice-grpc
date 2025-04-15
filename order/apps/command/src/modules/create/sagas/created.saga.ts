import { delay, firstValueFrom, map, Observable } from "rxjs";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { ClientGrpc } from "@nestjs/microservices";
import { ProductStatusEnum } from "@shared/enums/product.enum";
import { OrderCreatedEvent } from "@shared/events/created.event";
import { PRODUCT_COMMAND_SERVICE_NAME } from "@shared/constants/microservice.constant";
import { ProductCommandServiceClient, UpdateProductRequest } from "@shared/proto/product-command.pb";


@Injectable()
export class CreatedOrderSaga implements OnModuleInit {
    private productCommandServiceClient: ProductCommandServiceClient

    constructor(
        @Inject(PRODUCT_COMMAND_SERVICE_NAME)
        private readonly productCommandClient: ClientGrpc
    ) { }

    onModuleInit(): void {
        this.productCommandServiceClient = this.productCommandClient.getService<ProductCommandServiceClient>(PRODUCT_COMMAND_SERVICE_NAME)
    }

    private async onOrderCreatedEvent(event: OrderCreatedEvent): Promise<void> {
        const requests: UpdateProductRequest[] = event.products.map(product => ({
            id: product.product_id,
            status: ProductStatusEnum.Bought,
        }))

        const promises = requests.map(request => {
            return firstValueFrom(this.productCommandServiceClient.updateProduct(request))
        })

        await Promise.all(promises)
    }

    @Saga()
    onEvent(events: Observable<OrderCreatedEvent>): Observable<ICommand> {
        const apply = map((event: OrderCreatedEvent) => {
            this.onOrderCreatedEvent(event)
            return null
        })

        return <Observable<ICommand>>(
            events.pipe(ofType(OrderCreatedEvent), delay(1000), apply)
        )
    }
}