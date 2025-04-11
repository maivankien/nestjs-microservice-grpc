import { ICommand } from "@nestjs/cqrs";
import { CreateProductDto } from "../dtos/create.dto";

export class CreateProductCommand implements ICommand {
    public name: string
    public price: number
    public description: string

    constructor(payload: CreateProductDto) {
        this.name = payload.name
        this.price = payload.price
        this.description = payload.description
    }
}