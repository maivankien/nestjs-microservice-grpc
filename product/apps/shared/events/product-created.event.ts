import { BaseEvent } from "nestjs-event-sourcing";


type ProductCreatedPayload = Readonly<{
    id: string
    price: number
    name: string
    description: string
}>


export class ProductCreatedEvent extends BaseEvent {
    public readonly price: number
    public readonly name: string
    public readonly description: string

    constructor(payload: ProductCreatedPayload) {
        super(payload.id)
        this.price = payload.price
        this.name = payload.name
        this.description = payload.description
    }
}