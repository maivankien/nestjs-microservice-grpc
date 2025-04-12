import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { KAFKA_SERVICE } from "@query/common/constants/common.constant";
import { ProductCreatedConsumer } from "./consumer/product-created.consumer";
import { ProductCreatedHandler } from "./event/product-created.handler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "@query/infrastructure/entities/product.entity";

@Module({
    imports: [
        CqrsModule,
        ClientsModule.register([
            {
                name: KAFKA_SERVICE,
                transport: Transport.KAFKA
            }
        ]),
        TypeOrmModule.forFeature([
            Product
        ])
    ],
    controllers: [ProductCreatedConsumer],
    providers: [ProductCreatedHandler]
})
export class ProductCreatedModule { }