import { v4 as uuidv4 } from 'uuid';
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { CreateProductCommand } from "./create-product.command";
import { ProductAggregate } from "@command/common/aggregate/product.aggregate";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";


@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler implements ICommandHandler<CreateProductCommand, void> {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly eventSourcingHandler: EventSourcingHandler<ProductAggregate>
    ) { }

    async execute(command: CreateProductCommand): Promise<void> {
        const aggregate = new ProductAggregate()

        aggregate.setId(uuidv4())

        this.publisher.mergeObjectContext(aggregate as any)

        aggregate.created({
            name: command.name,
            price: command.price,
            description: command.description
        })

        await this.eventSourcingHandler.save(aggregate)

        aggregate.commit()
    }
}