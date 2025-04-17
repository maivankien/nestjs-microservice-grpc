import { IQuery } from "@nestjs/cqrs";

export class GetOrderQuery implements IQuery {
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}