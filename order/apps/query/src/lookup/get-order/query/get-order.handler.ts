import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { GetOrderQuery } from "./get-order.query";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Order } from "@query/infrastructure/entities/order.entity";
import { OrderData } from "@query/common/proto/order-query.pb";
import { GetOrderProductServiceClient } from "../service/get-order.service";

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery, OrderData> {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        private readonly getProductService: GetOrderProductServiceClient,
    ) { }

    async execute(query: GetOrderQuery): Promise<OrderData> {
        const raw = await this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.products', 'products')
            .where('order.id = :id', { id: query.id })
            .select([
                'order.id',
                'order.buyDate',
                'products.productId',
            ]).getMany()

        if (!raw?.length) return null

        const order = raw[0]
        const productIds = order.products.map(product => product.productId)
        const products = await this.getProductService.getProductByIds(productIds)

        return {
            buyDate: order.buyDate.toLocaleDateString(),
            products: products
        }
    }
}