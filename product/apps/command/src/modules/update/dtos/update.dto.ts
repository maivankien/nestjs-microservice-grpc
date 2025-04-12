import { IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateProductDto {
    @IsString()
    id: string

    @IsString()
    @IsOptional()
    name: string

    @IsNumber()
    @IsOptional()
    price: number

    @IsString()
    @IsOptional()
    description: string
}