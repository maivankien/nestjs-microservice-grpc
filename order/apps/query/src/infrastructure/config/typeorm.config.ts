import { DatabaseType } from "typeorm";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { Order } from "../entities/order.entity";
import { OrderProduct } from "../entities/order-product.entity";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                type: 'mysql' as DatabaseType,
                host: config.get('DATABASE_HOST'),
                port: config.get('DATABASE_PORT'),
                username: config.get('DATABASE_USERNAME'),
                password: config.get('DATABASE_PASSWORD'),
                database: config.get('DATABASE_NAME'),
                entities: [
                    Order,
                    OrderProduct
                ],
            })
        } as TypeOrmModuleAsyncOptions)
    ],
})
export class TypeOrmModuleConfig { }