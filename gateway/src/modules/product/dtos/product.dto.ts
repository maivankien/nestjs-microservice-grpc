import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

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


export class UpdateProductDto {
    @ApiProperty({
        example: "123e4567-e89b-12d3-a456-426614174000",
    })
    @IsUUID()
    id: string


    @ApiProperty({
        type: Number,
        description: "Product price",
        example: 100
    })
    @IsNumber()
    @IsOptional()
    price?: number

    @ApiProperty({
        type: String,
        description: "Product name",
        example: "Product 1"
    })
    @IsString()
    @IsOptional()
    name?: string

    @ApiProperty({
        type: String,
        description: "Product description",
        example: "Product 1 description"
    })
    @IsString()
    @IsOptional()
    description?: string
}