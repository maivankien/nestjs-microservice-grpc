import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { KAFKA_SERVICE } from "@query/common/constants/common.constant";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "@query/infrastructure/entities/product.entity";
import { ProductUpdatedConsumer } from "./consumer/product-updated.consumer";
import { ProductUpdatedHandler } from "./event/product-updated.event";

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
    controllers: [ProductUpdatedConsumer],
    providers: [ProductUpdatedHandler]
})
export class ProductUpdatedModule { }