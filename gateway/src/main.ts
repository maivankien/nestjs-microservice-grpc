import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from './configs/app/config.service';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/exceptions/exception.filter';

declare const module: NodeModule & { hot: any }

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const appConfig: AppConfigService = app.get(AppConfigService)
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

    app.setGlobalPrefix('api')
    app.useGlobalFilters(new AllExceptionsFilter())

    const swaggerConfig = new DocumentBuilder()
        .setTitle(appConfig.name)
        .setDescription('API Gateway for managing microservices communication using NestJS and gRPC')
        .setVersion("1.0.0")
        .addSecurity('ApiKeyAuth', {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
        })
        .addSecurityRequirements('ApiKeyAuth')
        .build()

    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('api-gateway', app, document)

    await app.init()
    await app.listen(appConfig.port)

    if (module.hot) {
        module.hot.accept()
        module.hot.dispose(() => app.close())
    }
}
bootstrap()
