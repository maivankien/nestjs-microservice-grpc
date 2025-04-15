import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderCreatedModule } from './modules/order-created/order-created.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        OrderCreatedModule
    ],
})
export class QueryModule { }
