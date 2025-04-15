import { ProductStatusEnum } from "@shared/enums/product.enum"
import { BaseEvent } from "nestjs-event-sourcing"


type ProductUpdatedPayload = Readonly<{
    id: string
    price?: number
    name?: string
    status?: ProductStatusEnum
    description?: string
}>

export class ProductUpdatedEvent extends BaseEvent {
    public price?: number
    public name?: string
    public status: ProductStatusEnum
    public description?: string

    constructor(payload: ProductUpdatedPayload) {
        super(payload.id)

        this.name = payload.name
        this.price = payload.price
        this.status = payload.status
        this.description = payload.description
    }
}