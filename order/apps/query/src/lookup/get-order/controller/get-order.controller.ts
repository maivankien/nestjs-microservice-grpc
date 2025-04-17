import { Controller, HttpStatus } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetOrderDto } from "./get-order.dto";
import { GrpcMethod, Payload } from "@nestjs/microservices";
import { GetOrderQuery } from "../query/get-order.query";
import { ORDER_QUERY_SERVICE_NAME } from "@shared/constants/microservice.constant";


@Controller('order')
export class GetOrderController {
    constructor(
        private readonly queryBus: QueryBus
    ) { }


    @GrpcMethod(ORDER_QUERY_SERVICE_NAME, 'GetOrder')
    async getOrder(@Payload() payload: GetOrderDto) {
        const { id } = payload

        const query = new GetOrderQuery(id)

        const order = await this.queryBus.execute(query)

        return {
            status: HttpStatus.OK,
            data: order,
        }
    }
}