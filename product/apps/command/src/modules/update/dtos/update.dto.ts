import { ProductStatusEnum } from "@shared/enums/product.enum"
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateProductDto {
    @IsString()
    id: string

    @IsString()
    @IsOptional()
    name: string

    @IsNumber()
    @IsOptional()
    price: number

    @IsEnum(ProductStatusEnum)
    @IsOptional()
    status: ProductStatusEnum

    @IsString()
    @IsOptional()
    description: string
}