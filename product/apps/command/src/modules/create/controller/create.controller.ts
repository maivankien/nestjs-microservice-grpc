import { Body, Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { CreateProductDto } from "../dtos/create.dto";
import { PRODUCT_COMMAND_SERVICE_NAME } from "@command/common/constants/microservice.constant";

@Controller()
export class CreateProductController {
    constructor(
        // @Inject()
    ) {}

    @GrpcMethod(PRODUCT_COMMAND_SERVICE_NAME, 'createProduct')
    private async createProduct(@Body() payload: CreateProductDto) {
        return {}
    }
}