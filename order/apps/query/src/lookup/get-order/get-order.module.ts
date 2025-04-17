import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GetOrderController } from "./controller/get-order.controller";
import { GetOrderHandler } from "./query/get-order.handler";
import { Order } from "@query/infrastructure/entities/order.entity";
import { GetOrderProductServiceClient } from "./service/get-order.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PRODUCT_QUERY_PACKAGE_NAME, PRODUCT_QUERY_PROTO_PATH, PRODUCT_QUERY_SERVICE_NAME } from "@shared/constants/microservice.constant";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([
            Order
        ]),
        ClientsModule.registerAsync([
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
        GetOrderController
    ],
    providers: [GetOrderHandler, GetOrderProductServiceClient],
})
export class GetOrderModule { }