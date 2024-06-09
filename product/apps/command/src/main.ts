import { NestFactory } from '@nestjs/core';
import { CommandModule } from './command.module';
import { AppConfigService } from './config/app/config.service';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PRODUCT_COMMAND_PACKAGE_NAME } from './common/constants/microservice.constant';


async function configure(app: INestApplication, config: AppConfigService): Promise<void> {
    app.enableShutdownHooks()

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

    app.connectMicroservice<GrpcOptions>(
        {
            transport: Transport.GRPC,
            options: {
                url: config.grpcUrl,
                protoPath: config.protoPath,
                package: PRODUCT_COMMAND_PACKAGE_NAME,
            }
        },
        { inheritAppConfig: true }
    )

    await app.startAllMicroservices()
}


async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(CommandModule)
    const config: AppConfigService = app.get(AppConfigService)

    await app.init()
    await configure(app, config)
}

bootstrap()
