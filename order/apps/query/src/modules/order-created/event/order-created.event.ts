import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { OrderCreatedEvent } from "@shared/events/created.event";

/**
 * OrderCreatedEvent handler
 * @param event OrderCreatedEvent
 */
@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
    constructor(

    ) { }

    handle(event: OrderCreatedEvent): void {
        console.log("OrderCreatedEvent", event);
    }
}