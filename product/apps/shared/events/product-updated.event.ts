import { BaseEvent } from "nestjs-event-sourcing"


type ProductUpdatedPayload = Readonly<{
    id: string
    price?: number
    name?: string
    description?: string
}>

export class ProductUpdatedEvent extends BaseEvent {
    public price?: number
    public name?: string
    public description?: string

    constructor(payload: ProductUpdatedPayload) {
        super(payload.id)

        this.name = payload.name
        this.price = payload.price
        this.description = payload.description
    }
}