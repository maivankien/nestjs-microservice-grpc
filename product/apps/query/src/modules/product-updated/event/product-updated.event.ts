import { Repository } from "typeorm";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "@query/infrastructure/entities/product.entity";
import { ProductUpdatedEvent } from "@shared/events/product-updated.event";

@EventsHandler(ProductUpdatedEvent)
export class ProductUpdatedHandler implements IEventHandler<ProductUpdatedEvent> {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async handle(event: ProductUpdatedEvent): Promise<void> {
        const update = {}
        const { id, name, price, description } = event

        if (name) {
            update["name"] = name
        }
        if (price) {
            update["price"] = price
        }
        if (description) {
            update["description"] = description
        }

        await this.productRepository.update(id, update)
    }
}