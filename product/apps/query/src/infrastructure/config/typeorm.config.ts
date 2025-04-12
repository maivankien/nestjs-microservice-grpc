import { DatabaseType } from "typeorm";
import { Module } from "@nestjs/common";
import { Product } from '../entities/product.entity';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";

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
                    Product
                ]
            })
        } as TypeOrmModuleAsyncOptions)
    ],
})
export class TypeOrmModuleConfig { }