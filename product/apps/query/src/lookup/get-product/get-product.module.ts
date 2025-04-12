import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "@query/infrastructure/entities/product.entity";
import { GetProductController } from "./controller/get-product.controller";
import { GetProductQueryHandler } from "./query/get-product.handler";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Product]),
    ],
    controllers: [GetProductController],
    providers: [GetProductQueryHandler],
})
export class GetProductModule { }