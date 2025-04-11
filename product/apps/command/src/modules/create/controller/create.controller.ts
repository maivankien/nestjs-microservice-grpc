import { CommandBus } from "@nestjs/cqrs";
import { Controller, HttpStatus } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { CreateProductDto } from "../dtos/create.dto";
import { CreateProductCommand } from "../command/create-product.command";
import { PRODUCT_COMMAND_SERVICE_NAME } from "@command/common/constants/microservice.constant";

@Controller()
export class CreateProductController {
    constructor(
        private readonly commandBus: CommandBus
    ) { }

    @GrpcMethod(PRODUCT_COMMAND_SERVICE_NAME, 'createProduct')
    private async createProduct(payload: CreateProductDto) {
        await this.commandBus.execute(new CreateProductCommand(payload))

        return {
            status: HttpStatus.CREATED,
            error: null,
        }
    }
}