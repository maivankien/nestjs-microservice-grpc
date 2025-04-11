import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ProductCreatedEvent } from "@shared/events/product-created.event";
import { ProductEventProducer } from "@command/common/producer/product-event.producer";


@EventsHandler(ProductCreatedEvent)
export class ProductCreatedHandler implements IEventHandler<ProductCreatedEvent> {
    constructor(
        private readonly eventProducer: ProductEventProducer
    ) { }

    async handle(event: ProductCreatedEvent): Promise<void> {
        const { constructor } = Object.getPrototypeOf(event)

        const { name } = constructor

        this.eventProducer.produce(name, event)
    }
}