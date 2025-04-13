import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ClientGrpc } from "@nestjs/microservices";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto";
import { AuthGuard } from "src/modules/auth/guard/auth.guard";
import { ProductCommandServiceClient } from "../proto/product-command.proto";
import { ProductQueryServiceClient } from "../proto/product-query.proto";
import { Body, Controller, Get, Inject, OnModuleInit, Param, ParseUUIDPipe, Post, Put, UseGuards } from "@nestjs/common";
import { PRODUCT_COMMAND_SERVICE_NAME, PRODUCT_QUERY_SERVICE_NAME } from "src/common/constants/microservice.constant";


@ApiTags('Product')
@Controller('product')
export class ProductController implements OnModuleInit {
    private commandService: ProductCommandServiceClient
    private queryService: ProductQueryServiceClient


    constructor(
        @Inject(PRODUCT_COMMAND_SERVICE_NAME)
        private readonly commandClient: ClientGrpc,

        @Inject(PRODUCT_QUERY_SERVICE_NAME)
        private readonly queryClient: ClientGrpc
    ) { }

    public onModuleInit(): void {
        this.queryService = this.queryClient.getService<ProductQueryServiceClient>(PRODUCT_QUERY_SERVICE_NAME)
        this.commandService = this.commandClient.getService<ProductCommandServiceClient>(PRODUCT_COMMAND_SERVICE_NAME)
    }


    @Post()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Create product' })
    public async createProduct(@Body() createProductDto: CreateProductDto) {
        return this.commandService.createProduct(createProductDto)
    }

    @Put()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Update product' })
    public async updateProduct(@Body() updateProductDto: UpdateProductDto) {
        return this.commandService.updateProduct(updateProductDto)
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get product by id' })
    public async getProduct(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.queryService.getProduct({ id })
    }
}