import { ProductEventProducer } from "@command/common/producer/product-event.producer";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ProductUpdatedEvent } from "@shared/events/product-updated.event";

@EventsHandler(ProductUpdatedEvent)
export class ProductUpdatedHandler implements IEventHandler<ProductUpdatedEvent> {
    constructor(
        private readonly eventProducer: ProductEventProducer
    ) { }

    async handle(event: ProductUpdatedEvent): Promise<void> {
        const { constructor } = Object.getPrototypeOf(event)

        const { name } = constructor

        this.eventProducer.produce(name, event)
    }
}
