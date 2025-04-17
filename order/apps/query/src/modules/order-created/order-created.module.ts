import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderCreatedHandler } from "./event/order-created.event";
import { OrderCreatedConsumer } from "./consumer/order-created.consumer";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { KAFKA_SERVICE } from "@shared/constants/kafka.constant";
import { Order } from "@query/infrastructure/entities/order.entity";
import { OrderProduct } from "@query/infrastructure/entities/order-product.entity";

@Module({
    imports: [
        CqrsModule,
        ClientsModule.register([
            {
                name: KAFKA_SERVICE,
                transport: Transport.KAFKA,
            }
        ]),
        TypeOrmModule.forFeature([
            Order,
            OrderProduct
        ])
    ],
    controllers: [OrderCreatedConsumer],
    providers: [
        OrderCreatedHandler
    ],
})
export class OrderCreatedModule { }