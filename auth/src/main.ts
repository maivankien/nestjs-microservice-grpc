import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { AppConfigService } from './config/app/config.service';
import { AUTH_PACKAGE_NAME } from './common/constants/microservice.constant';


async function bootstrap() {
    const appContext = await NestFactory.createApplicationContext(AppModule)
    const appConfig: AppConfigService = appContext.get(AppConfigService)

    const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            url: appConfig.grpcUrl,
            package: AUTH_PACKAGE_NAME,
            protoPath: appConfig.protoPath,
        },
    })

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

    await app.listen()

    appContext.close()
}

bootstrap()
