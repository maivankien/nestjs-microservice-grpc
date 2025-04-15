import { ICommand } from "@nestjs/cqrs";
import { UpdateProductDto } from "../dtos/update.dto";
import { ProductStatusEnum } from "@shared/enums/product.enum";

export class UpdateProductCommand implements ICommand {
    id?: string
    name?: string
    price?: number
    status?: ProductStatusEnum
    description?: string

    constructor(payload: UpdateProductDto) {
        this.id = payload.id
        this.name = payload.name
        this.price = payload.price
        this.status = payload.status
        this.description = payload.description
    }
}