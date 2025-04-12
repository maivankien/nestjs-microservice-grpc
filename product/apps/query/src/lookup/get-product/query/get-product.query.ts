import { IQuery } from '@nestjs/cqrs';

export class GetProductQuery implements IQuery {
    public id: string

    constructor(id: string) {
        this.id = id
    }
}
