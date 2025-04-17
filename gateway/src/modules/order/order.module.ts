import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { OrderController } from "./controller/order.controller";
import { AuthModule } from "../auth/auth.module";
import {
    ORDER_COMMAND_PACKAGE_NAME, ORDER_COMMAND_PROTO_PATH,
    ORDER_COMMAND_SERVICE_NAME, ORDER_QUERY_PACKAGE_NAME,
    ORDER_QUERY_PROTO_PATH, ORDER_QUERY_SERVICE_NAME
} from "src/common/constants/microservice.constant";

@Module({
    imports: [
        AuthModule,
        ClientsModule.registerAsync([
            {
                imports: [ConfigModule],
                inject: [ConfigService],
                name: ORDER_COMMAND_SERVICE_NAME,
                useFactory: async (config: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: ORDER_COMMAND_PACKAGE_NAME,
                        protoPath: ORDER_COMMAND_PROTO_PATH,
                        url: config.get('ORDER_COMMAND_SERVICE_URL'),
                    },
                }),
            },
            {
                imports: [ConfigModule],
                inject: [ConfigService],
                name: ORDER_QUERY_SERVICE_NAME,
                useFactory: async (config: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: ORDER_QUERY_PACKAGE_NAME,
                        protoPath: ORDER_QUERY_PROTO_PATH,
                        url: config.get('ORDER_QUERY_SERVICE_URL'),
                    },
                }),
            }
        ])
    ],
    controllers: [OrderController],
})
export class OrderModule { }