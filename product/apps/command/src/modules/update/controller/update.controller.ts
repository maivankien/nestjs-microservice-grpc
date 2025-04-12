import { CommandBus } from "@nestjs/cqrs";
import { Controller, HttpStatus } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { UpdateProductDto } from "../dtos/update.dto";
import { UpdateProductCommand } from "../command/update-product.command";
import { PRODUCT_COMMAND_SERVICE_NAME } from "@shared/constants/microservice.constant";

@Controller()
export class UpdateProductController {
    constructor(
        private readonly commandBus: CommandBus
    ) { }

    @GrpcMethod(PRODUCT_COMMAND_SERVICE_NAME, 'updateProduct')
    private async updateProduct(payload: UpdateProductDto) {

        await this.commandBus.execute(new UpdateProductCommand(payload))

        return {
            status: HttpStatus.OK,
            error: null,
        }
    }
}