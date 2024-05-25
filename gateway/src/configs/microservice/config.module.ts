import { Module } from "@nestjs/common";
import configuration from "./configuration";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MicroserviceConfigService } from "./config.service";


@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration]
        }),
    ],
    providers: [ConfigService, MicroserviceConfigService],
    exports: [ConfigService, MicroserviceConfigService],
})
export class MicroserviceConfigModule { }