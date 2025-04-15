import { CreatedOrderPayload, OrderProduct } from "@command/common/aggregate/order.aggregate";
import { BaseEvent } from "nestjs-event-sourcing";

export class OrderCreatedEvent extends BaseEvent {
    public readonly buyDate: Date
    public readonly products: OrderProduct[]

    constructor(payload: CreatedOrderPayload) {
        super(payload.id)
        
        this.buyDate = payload.buyDate
        this.products = payload.products
    }
}