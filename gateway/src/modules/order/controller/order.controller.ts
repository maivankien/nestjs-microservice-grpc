import { Response } from "express";
import { firstValueFrom } from "rxjs";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ClientGrpc } from "@nestjs/microservices";
import { CreateOrderDto } from "../dtos/order.dto";
import { AuthGuard } from "src/modules/auth/guard/auth.guard";
import { OrderCommandServiceClient } from "../proto/order-command.proto";
import { ORDER_COMMAND_SERVICE_NAME, ORDER_QUERY_SERVICE_NAME } from "src/common/constants/microservice.constant";
import { Body, Controller, Get, HttpStatus, Inject, OnModuleInit, Param, ParseUUIDPipe, Post, Res, UseGuards } from "@nestjs/common";
import { OrderQueryServiceClient } from "../proto/order-query.proto";



@ApiTags('Order')
@Controller('order')
export class OrderController implements OnModuleInit {
    private queryService: OrderQueryServiceClient
    private commandService: OrderCommandServiceClient

    constructor(
        @Inject(ORDER_COMMAND_SERVICE_NAME)
        private readonly commandClient: ClientGrpc,
        
        @Inject(ORDER_QUERY_SERVICE_NAME)
        private readonly queryClient: ClientGrpc,
    ) { }

    onModuleInit() {
        this.queryService = this.queryClient.getService<OrderQueryServiceClient>(ORDER_QUERY_SERVICE_NAME)
        this.commandService = this.commandClient.getService<OrderCommandServiceClient>(ORDER_COMMAND_SERVICE_NAME)
    }

    @Post()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Create order' })
    async createOrder(@Res() res: Response, @Body() payload: CreateOrderDto) {
        const response = await firstValueFrom(this.commandService.createOrder(payload))

        if (response.status !== HttpStatus.CREATED) {
            return res.status(response.status).json({
                status: response.status,
                error: response.error,
            })
        }

        return res.status(HttpStatus.CREATED).json({
            message: "Order created successfully",
            ...response,
        })
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get order by id' })
    async getOrder(@Res() res: Response, @Param('id', new ParseUUIDPipe()) id: string) {
        const response = await firstValueFrom(this.queryService.getOrder({ id }))

        if (response.status !== HttpStatus.OK) {
            return res.status(response.status).json({
                status: response.status,
                error: response.error,
            })
        }

        return res.status(HttpStatus.OK).json({
            message: "Order retrieved successfully",
            ...response,
        })
    }
}