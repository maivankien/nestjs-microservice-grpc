import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { ArrayMinSize, IsNotEmpty, IsUUID, ValidateNested } from "class-validator"


export class OrderProductDto {
    @ApiProperty({
        description: 'Product ID',
    })
    @IsNotEmpty()
    @IsUUID()
    id: string
}


export class CreateOrderDto {
    @ApiProperty({
        example: [
            {
                id: '3c57b27f-1dba-46f1-b2ce-96b39ed6134d'
            }
        ]
    })
    @ArrayMinSize(1)
    @Type(() => OrderProductDto)
    @ValidateNested({ each: true })
    products: OrderProductDto[]
}