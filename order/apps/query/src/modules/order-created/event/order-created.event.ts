import { Repository } from "typeorm";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderCreatedEvent } from "@shared/events/created.event";
import { Order } from "@query/infrastructure/entities/order.entity";
import { OrderProduct } from "@query/infrastructure/entities/order-product.entity";

/**
 * OrderCreatedEvent handler
 * @param event OrderCreatedEvent
 */
@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        @InjectRepository(OrderProduct)
        private readonly orderProductRepository: Repository<OrderProduct>
    ) { }

    async handle(event: OrderCreatedEvent): Promise<void> {
        const { id, buyDate, products } = event

        const order = new Order()

        order.id = id
        order.buyDate = buyDate

        order.products = products.map(product => {
            const orderProduct = new OrderProduct()

            orderProduct.id = product.id
            orderProduct.productId = product.product_id

            return orderProduct
        })

        await this.orderRepository.save(order)
    }
}