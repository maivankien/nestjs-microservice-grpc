import { Response } from "express";
import { firstValueFrom } from "rxjs";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ClientGrpc } from "@nestjs/microservices";
import { CreateOrderDto } from "../dtos/order.dto";
import { AuthGuard } from "src/modules/auth/guard/auth.guard";
import { OrderCommandServiceClient } from "../proto/order-command.proto";
import { ORDER_COMMAND_SERVICE_NAME } from "src/common/constants/microservice.constant";
import { Body, Controller, HttpStatus, Inject, OnModuleInit, Post, Res, UseGuards } from "@nestjs/common";



@ApiTags('Order')
@Controller('order')
export class OrderController implements OnModuleInit {
    private commandService: OrderCommandServiceClient

    constructor(
        @Inject(ORDER_COMMAND_SERVICE_NAME)
        private readonly commandClient: ClientGrpc,
    ) { }

    onModuleInit() {
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
}