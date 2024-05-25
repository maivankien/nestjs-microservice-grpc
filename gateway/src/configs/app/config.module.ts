import { Module } from "@nestjs/common";
import { AppConfigService } from "./config.service";
import configuration from './configuration';
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            envFilePath: '.env',
            isGlobal: true
        }),
    ],
    providers: [ConfigService, AppConfigService],
    exports: [ConfigService, AppConfigService],
})

export class AppConfigModule { }