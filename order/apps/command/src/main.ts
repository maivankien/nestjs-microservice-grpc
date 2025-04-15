import { NestFactory } from '@nestjs/core';
import { CommandModule } from './command.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { HttpExceptionFilter } from './infrastructure/filter/http-exception';
import { ORDER_COMMAND_PACKAGE_NAME, ORDER_COMMAND_PROTO_PATH } from '@shared/constants/microservice.constant';


async function configure(app: INestApplication, config: ConfigService): Promise<void> {
    app.enableShutdownHooks()

    app.useGlobalFilters(new HttpExceptionFilter())
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

    app.connectMicroservice<GrpcOptions>(
        {
            transport: Transport.GRPC,
            options: {
                url: config.get('COMMAND_GRPC_URL'),
                package: ORDER_COMMAND_PACKAGE_NAME,
                protoPath: ORDER_COMMAND_PROTO_PATH
            }
        },
        { inheritAppConfig: true }
    )

    await app.startAllMicroservices()
}


async function bootstrap() {
    const app: INestApplication = await NestFactory.create(CommandModule)
    const config: ConfigService = app.get(ConfigService)

    await app.init()
    await configure(app, config)
}

bootstrap()
