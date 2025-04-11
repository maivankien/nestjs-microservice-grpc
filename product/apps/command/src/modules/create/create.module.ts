import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateProductController } from "./controller/create.controller";
import { CreateProductCommandHandler } from "./command/create-product.handler";
import { ProductEventProducer } from "@command/common/producer/product-event.producer";
import { ProductCreatedHandler } from "./event/product-created.handler";

@Module({
    imports: [
        CqrsModule,
    ],
    controllers: [CreateProductController],
    providers: [
        ProductEventProducer,
        ProductCreatedHandler,
        CreateProductCommandHandler,
    ]
})
export class CreateProductModule {}