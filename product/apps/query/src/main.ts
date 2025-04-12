import { NestFactory } from '@nestjs/core';
import { QueryModule } from './query.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { GrpcOptions, KafkaOptions, Transport } from '@nestjs/microservices';
import { ConsumerGroupId, KafkaClientId } from '@shared/kafka/constants';
import { PRODUCT_QUERY_PACKAGE_NAME, PRODUCT_QUERY_PROTO_PATH } from '@shared/constants/microservice.constant';


async function configure(app: INestApplication, config: ConfigService): Promise<void> {
    app.enableShutdownHooks()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

    app.connectMicroservice<KafkaOptions>(
        {
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: KafkaClientId.Product,
                    brokers: [config.get('KAFKA_URL')]
                },
                consumer: {
                    groupId: ConsumerGroupId.ProductSvc
                }
            }
        },
        { inheritAppConfig: true }
    )

    app.connectMicroservice<GrpcOptions>(
        {
            transport: Transport.GRPC,
            options: {
                url: config.get('QUERY_GRPC_URL'),
                protoPath: PRODUCT_QUERY_PROTO_PATH,
                package: PRODUCT_QUERY_PACKAGE_NAME,
            }
        },
        { inheritAppConfig: true }
    )

    await app.startAllMicroservices()
}

async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(QueryModule)
    const config: ConfigService = app.get(ConfigService)

    await configure(app, config)

    await app.listen(undefined)
}

bootstrap()