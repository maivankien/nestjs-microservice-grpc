import { NestFactory } from '@nestjs/core';
import { QueryModule } from './query.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './infrastructure/filter/http-exception';
import { GrpcOptions, KafkaOptions, Transport } from '@nestjs/microservices';
import { ConsumerGroupId, KafkaClientId } from '@shared/constants/kafka.constant';
import { ORDER_QUERY_PACKAGE_NAME, ORDER_QUERY_PROTO_PATH } from '@shared/constants/microservice.constant';


async function configure(app: INestApplication, config: ConfigService): Promise<void> {
    app.enableShutdownHooks()
    app.useGlobalFilters(new HttpExceptionFilter())
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

    app.connectMicroservice<KafkaOptions>(
        {
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: KafkaClientId.Order,
                    brokers: [config.get('KAFKA_URL')]
                },
                consumer: {
                    groupId: ConsumerGroupId.OrderSvc
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
                protoPath: ORDER_QUERY_PROTO_PATH,
                package: ORDER_QUERY_PACKAGE_NAME,
            }
        },
        { inheritAppConfig: true }
    )

    await app.startAllMicroservices()
}


async function bootstrap() {
    const app = await NestFactory.create(QueryModule)
    const config = app.get(ConfigService)

    await configure(app, config)
    
    await app.listen(undefined)
}

bootstrap()
