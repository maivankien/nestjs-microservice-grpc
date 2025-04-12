import { QueryBus } from "@nestjs/cqrs";
import { GrpcMethod } from "@nestjs/microservices";
import { GetProductDto } from "./get-product.dto";
import { GetProductQuery } from "../query/get-product.query";
import { Product } from "@query/infrastructure/entities/product.entity";
import { Controller, HttpStatus } from "@nestjs/common";
import { PRODUCT_QUERY_SERVICE_NAME } from "@shared/constants/microservice.constant";

@Controller()
export class GetProductController {
    constructor(
        private readonly queryBus: QueryBus
    ) { }

    @GrpcMethod(PRODUCT_QUERY_SERVICE_NAME, 'getProduct')
    private async getProduct(queries: GetProductDto) {
        const query = new GetProductQuery(queries.id)

        const data: Product = await this.queryBus.execute(query)

        return {
            status: HttpStatus.OK,
            error: null,
            data,
        }
    }
}