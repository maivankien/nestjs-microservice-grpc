import { Module } from "@nestjs/common";
import { UpdateProductController } from "./controller/update.controller";

@Module({
    imports: [],
    controllers: [UpdateProductController]
})
export class UpdateProductModule { }