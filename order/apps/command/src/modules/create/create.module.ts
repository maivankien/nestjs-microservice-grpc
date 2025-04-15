import {
    PRODUCT_COMMAND_PACKAGE_NAME,
    PRODUCT_COMMAND_PROTO_PATH,
    PRODUCT_COMMAND_SERVICE_NAME,
    PRODUCT_QUERY_PACKAGE_NAME,
    PRODUCT_QUERY_PROTO_PATH,
    PRODUCT_QUERY_SERVICE_NAME
} from "@shared/constants/microservice.constant";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CreateOrderController } from "./controller/create.controller";
import { CreateOrderCommandHandler } from "./command/create.handler";
import { OrderCreatedHandler } from "./event/created.handler";
import { CreatedOrderSaga } from "./sagas/created.saga";
import { OrderEventProducer } from "@command/common/producer/order-event.producer";


@Module({
    imports: [
        CqrsModule,
        ClientsModule.registerAsync([
            {
                imports: [ConfigModule],
                inject: [ConfigService],
                name: PRODUCT_COMMAND_SERVICE_NAME,
                useFactory: (config: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        url: config.get('PRODUCT_COMMAND_SERVICE_URL'),
                        package: PRODUCT_COMMAND_PACKAGE_NAME,
                        protoPath: PRODUCT_COMMAND_PROTO_PATH,
                    }
                })
            },
            {
                imports: [ConfigModule],
                inject: [ConfigService],
                name: PRODUCT_QUERY_SERVICE_NAME,
                useFactory: (config: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        url: config.get('PRODUCT_QUERY_SERVICE_URL'),
                        package: PRODUCT_QUERY_PACKAGE_NAME,
                        protoPath: PRODUCT_QUERY_PROTO_PATH,
                    }
                })
            },
        ])
    ],
    controllers: [
        CreateOrderController
    ],
    providers: [
        OrderEventProducer,
        OrderCreatedHandler,
        CreatedOrderSaga,
        CreateOrderCommandHandler
    ],
})
export class CreateOrderModule { }