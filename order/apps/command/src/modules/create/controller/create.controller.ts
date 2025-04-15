import { CommandBus } from "@nestjs/cqrs";
import { GrpcMethod } from "@nestjs/microservices";
import { CreateOrderDto } from "../dtos/create.dto";
import { CreateOrderCommand } from '../command/create.command';
import { Controller, Body, HttpStatus } from '@nestjs/common';
import { ORDER_COMMAND_SERVICE_NAME } from "@shared/constants/microservice.constant";


@Controller()
export class CreateOrderController {
    constructor(
        private readonly commandBus: CommandBus
    ) { }

    @GrpcMethod(ORDER_COMMAND_SERVICE_NAME, 'createOrder')
    async createOrder(@Body() payload: CreateOrderDto) {        
        const command = new CreateOrderCommand(payload)

        await this.commandBus.execute(command)

        return {
            status: HttpStatus.CREATED,
            error: null,
        }
    }
}