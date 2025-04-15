import { OrderCreatedEvent } from "@shared/events/created.event"
import { ExtendedAggregateRoot } from "nestjs-event-sourcing"


export type CreatedOrderPayload = Readonly<{
    id: string
    buyDate: Date
    products: OrderProduct[]
}>


export class OrderProduct {
    id: string
    product_id: string
}


export class OrderAggregate extends ExtendedAggregateRoot {
    private buyDate: Date
    private products: OrderProduct[]

    getId(): string | undefined {
        return this.id
    }

    setId(value: string) {
        this.id = value
    }

    getBuyDate(): Date {
        return this.buyDate
    }

    setBuyDate(value: Date) {
        this.buyDate = value
    }

    getProducts(): OrderProduct[] {
        return this.products
    }

    setProducts(value: OrderProduct[]) {
        this.products = value
    }

    public created(payload: CreatedOrderPayload) {
        const event = new OrderCreatedEvent({
            ...payload,
            id: this.getId(),
        })

        this.apply(event)
    }
}