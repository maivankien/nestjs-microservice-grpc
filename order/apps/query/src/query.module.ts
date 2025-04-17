import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderCreatedModule } from './modules/order-created/order-created.module';
import { TypeOrmModuleConfig } from './infrastructure/config/typeorm.config';
import { GetOrderModule } from './lookup/get-order/get-order.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        GetOrderModule,
        TypeOrmModuleConfig,
        OrderCreatedModule,
    ],
})
export class QueryModule { }
