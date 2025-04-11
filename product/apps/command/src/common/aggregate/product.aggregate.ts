import { ProductCreatedEvent } from "@shared/events/product-created.event";
import { ExtendedAggregateRoot } from "nestjs-event-sourcing";

export type ProductCreatedPayload = Readonly<{
    price: number
    name: string
    description: string
}>

export type ProductUpdatedPayload = Readonly<{
    price: number
    name: string
    description: string
}>


export class ProductAggregate extends ExtendedAggregateRoot {
    private price: number
    private name: string
    private description: string

    public getId(): string | undefined {
        return this.id
    }

    public setId(value: string) {
        this.id = value
    }

    public getPrice(): number {
        return this.price
    }

    public setPrice(value: number) {
        this.price = value
    }

    public getName(): string {
        return this.name
    }

    public setName(value: string) {
        this.name = value
    }

    public getDescription(): string {
        return this.description
    }

    public setDescription(value: string) {
        this.description = value
    }

    public created(payload: ProductCreatedPayload) {
        const event = new ProductCreatedEvent({
            ...payload,
            id: this.getId(),
        })

        this.apply(event)
    }
}