import { ArrayMinSize, IsNotEmpty } from "class-validator";

export class OrderProductDto {
    @IsNotEmpty()
    id: string
}


export class CreateOrderDto {
    @IsNotEmpty()
    @ArrayMinSize(1)
    products: OrderProductDto[]
}