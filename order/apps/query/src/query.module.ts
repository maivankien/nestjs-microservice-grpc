import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderCreatedModule } from './modules/order-created/order-created.module';
import { TypeOrmModuleConfig } from './infrastructure/config/typeorm.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        TypeOrmModuleConfig,
        OrderCreatedModule
    ],
})
export class QueryModule { }
