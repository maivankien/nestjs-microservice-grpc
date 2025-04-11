import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({
        type: Number,
        description: "Product price",
        example: 100
    })
    @IsNumber()
    price: number

    @ApiProperty({
        type: String,
        description: "Product name",
        example: "Product 1"
    })
    @IsString()
    name: string

    @ApiProperty({
        type: String,
        description: "Product description",
        example: "Product 1 description"
    })
    @IsString()
    description: string
}