import { Repository } from "typeorm";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "@query/infrastructure/entities/product.entity";
import { ProductCreatedEvent } from "@shared/events/product-created.event";


@EventsHandler(ProductCreatedEvent)
export class ProductCreatedHandler implements IEventHandler<ProductCreatedEvent> {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async handle(event: ProductCreatedEvent): Promise<Product> {
        const product = new Product()

        product.id = event.id
        product.price = event.price
        product.name = event.name
        product.description = event.description

        return await this.productRepository.save(product)
    }
}