import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ProductController } from "./controllers/product.controller";
import { MicroserviceConfigModule } from "src/configs/microservice/config.module";
import { MicroserviceConfigService } from "src/configs/microservice/config.service";
import { PRODUCT_COMMAND_PACKAGE_NAME, PRODUCT_COMMAND_SERVICE_NAME, PRODUCT_QUERY_PACKAGE_NAME, PRODUCT_QUERY_SERVICE_NAME } from "src/common/constants/microservice.constant";

@Module({
    imports: [
        AuthModule,
        ClientsModule.registerAsync([
            {
                name: PRODUCT_COMMAND_SERVICE_NAME,
                imports: [MicroserviceConfigModule],
                useFactory: async (configService: MicroserviceConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: PRODUCT_COMMAND_PACKAGE_NAME,
                        url: configService.productCommandServiceUrl,
                        protoPath: configService.productCommandServicePathProto,
                    },
                }),
                inject: [MicroserviceConfigService],
            },
            {
                name: PRODUCT_QUERY_SERVICE_NAME,
                imports: [MicroserviceConfigModule],
                useFactory: async (configService: MicroserviceConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: PRODUCT_QUERY_PACKAGE_NAME,
                        url: configService.productQueryServiceUrl,
                        protoPath: configService.productQueryServicePathProto,
                    },
                }),
                inject: [MicroserviceConfigService],
            },
        ]),
    ],
    controllers: [ProductController],
})
export class ProductModule { }