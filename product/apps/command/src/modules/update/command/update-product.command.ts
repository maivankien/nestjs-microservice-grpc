import { ICommand } from "@nestjs/cqrs";
import { UpdateProductDto } from "../dtos/update.dto";

export class UpdateProductCommand implements ICommand {
    id?: string
    name?: string
    price?: number
    description?: string

    constructor(payload: UpdateProductDto) {
        this.id = payload.id
        this.name = payload.name
        this.price = payload.price
        this.description = payload.description
    }
}