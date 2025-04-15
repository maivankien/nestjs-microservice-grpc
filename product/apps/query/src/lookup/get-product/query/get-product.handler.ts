import { Repository } from "typeorm";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ProductData } from "@shared/proto/product-query.proto";
import { GetProductQuery } from "./get-product.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "@query/infrastructure/entities/product.entity";


@QueryHandler(GetProductQuery)
export class GetProductQueryHandler implements IQueryHandler<GetProductQuery, ProductData> {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async execute(query: GetProductQuery): Promise<ProductData> {
        return await this.productRepository.findOne({
            where: {
                id: query.id,
            },
            select: {
                id: true,
                name: true,
                price: true,
                status: true,
                description: true,
            }
        })
    }
} 