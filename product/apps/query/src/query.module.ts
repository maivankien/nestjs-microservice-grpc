import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleConfig } from './infrastructure/config/typeorm.config';
import { ProductCreatedModule } from './modules/product-created/product-created.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true
        }),
        TypeOrmModuleConfig,
        ProductCreatedModule
    ],
})
export class QueryModule { }
