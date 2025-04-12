import { IsUUID } from "class-validator";

export class GetProductDto {
    @IsUUID()
    id: string
}