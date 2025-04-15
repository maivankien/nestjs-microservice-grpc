import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { OrderCreatedHandler } from "./event/order-created.event";
import { OrderCreatedConsumer } from "./consumer/order-created.consumer";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { KAFKA_SERVICE } from "@shared/constants/kafka.constant";
import { TypeOrmModuleConfig } from "@query/infrastructure/config/typeorm.config";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModuleConfig,
        ClientsModule.register([
            {
                name: KAFKA_SERVICE,
                transport: Transport.KAFKA,
            }
        ])
    ],
    controllers: [OrderCreatedConsumer],
    providers: [
        OrderCreatedHandler
    ],
})
export class OrderCreatedModule { }