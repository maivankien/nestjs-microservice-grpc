import { ICommand } from '@nestjs/cqrs';
import { CreateOrderDto, OrderProductDto } from '../dtos/create.dto';


export class CreateOrderCommand implements ICommand {
    public products: OrderProductDto[]

    constructor(payload: CreateOrderDto) {
        this.products = payload.products
    }
}