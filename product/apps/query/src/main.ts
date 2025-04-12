import { NestFactory } from '@nestjs/core';
import { QueryModule } from './query.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { ConsumerGroupId, KafkaClientId } from '@shared/kafka/constants';


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

    await app.startAllMicroservices()
}

async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(QueryModule)
    const config: ConfigService = app.get(ConfigService)

    await configure(app, config)

    await app.listen(undefined)
}

bootstrap()