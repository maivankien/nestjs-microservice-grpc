import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleConfig } from './infrastructure/config/typeorm.config';
import { ProductCreatedModule } from './modules/product-created/product-created.module';
import { GetProductModule } from './lookup/get-product/get-product.module';
import { ProductUpdatedModule } from './modules/product-updated/product-updated.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true
        }),
        GetProductModule,
        TypeOrmModuleConfig,
        ProductCreatedModule,
        ProductUpdatedModule,
    ],
})
export class QueryModule { }
