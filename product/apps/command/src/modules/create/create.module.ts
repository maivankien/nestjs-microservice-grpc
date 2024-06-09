import { Module } from "@nestjs/common";
import { CreateProductController } from "./controller/create.controller";

@Module({
    imports: [],
    controllers: [CreateProductController],
    providers: []
})
export class CreateProductModule {}