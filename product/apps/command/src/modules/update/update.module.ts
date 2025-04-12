import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UpdateProductController } from "./controller/update.controller";
import { UpdateProductCommandHandler } from "./command/update-product.handler";
import { PRODUCT_QUERY_PACKAGE_NAME, PRODUCT_QUERY_PROTO_PATH, PRODUCT_QUERY_SERVICE_NAME } from "@shared/constants/microservice.constant";
import { ProductUpdatedHandler } from "./event/product-updated.handler";
import { EventSourcingHandler } from "nestjs-event-sourcing";
import { ProductEventProducer } from "@command/common/producer/product-event.producer";

@Module({
    imports: [
        CqrsModule,
        ClientsModule.registerAsync([
            {
                imports: [ConfigModule],
                inject: [ConfigService],
                name: PRODUCT_QUERY_SERVICE_NAME,
                useFactory: (config: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        url: config.get<string>('QUERY_GRPC_URL'),
                        package: PRODUCT_QUERY_PACKAGE_NAME,
                        protoPath: PRODUCT_QUERY_PROTO_PATH,
                    }
                })
            }
        ])
    ],
    controllers: [UpdateProductController],
    providers: [
        ProductEventProducer,
        EventSourcingHandler,
        ProductUpdatedHandler,
        UpdateProductCommandHandler,
    ],
})
export class UpdateProductModule { }