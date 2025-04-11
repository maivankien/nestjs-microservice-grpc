import { ApiTags } from "@nestjs/swagger";
import { ClientGrpc } from "@nestjs/microservices";
import { CreateProductDto } from "../dtos/product.dto";
import { AuthGuard } from "src/modules/auth/guard/auth.guard";
import { ProductCommandServiceClient } from "../proto/product-command.proto";
import { Body, Controller, Inject, OnModuleInit, Post, UseGuards } from "@nestjs/common";
import { PRODUCT_COMMAND_SERVICE_NAME } from "src/common/constants/microservice.constant";


@ApiTags('Product')
@Controller('product')
export class ProductController implements OnModuleInit {
    private commandService: ProductCommandServiceClient


    constructor(
        @Inject(PRODUCT_COMMAND_SERVICE_NAME)
        private readonly commandClient: ClientGrpc
    ) { }

    public onModuleInit(): void {
        this.commandService = this.commandClient.getService<ProductCommandServiceClient>(PRODUCT_COMMAND_SERVICE_NAME)
    }


    @Post()
    @UseGuards(AuthGuard)
    private async createProduct(@Body() createProductDto: CreateProductDto) {
        return this.commandService.createProduct(createProductDto)
    }
}