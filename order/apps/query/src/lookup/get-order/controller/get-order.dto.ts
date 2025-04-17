import { IsUUID } from "class-validator";

export class GetOrderDto {
    @IsUUID()
    id: string
}