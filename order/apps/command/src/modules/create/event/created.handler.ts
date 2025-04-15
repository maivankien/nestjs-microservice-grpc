import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { OrderCreatedEvent } from "@shared/events/created.event";
import { OrderEventProducer } from "@command/common/producer/order-event.producer";


@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
    constructor(
        private readonly orderProducer: OrderEventProducer
    ) { }

    async handle(event: OrderCreatedEvent) {
        const { constructor }: OrderCreatedEvent = Object.getPrototypeOf(event)

        this.orderProducer.produce(constructor.name, event)
    }
}