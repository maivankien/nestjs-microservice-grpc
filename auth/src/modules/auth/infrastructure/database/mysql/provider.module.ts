import { DatabaseType } from "typeorm";
import { Module } from "@nestjs/common";
import { AppConfigModule } from "src/config/app/config.module";
import { AppConfigService } from "src/config/app/config.service";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";


@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [AppConfigModule],
            inject: [AppConfigService],
            useFactory: async (config: AppConfigService) => ({
                autoLoadEntities: true,
                type: 'mysql' as DatabaseType,
                host: config.databaseHost,
                port: config.databasePort,
                database: config.databaseName,
                password: config.databasePassword,
                username: config.databaseUsername,
            })
        } as TypeOrmModuleAsyncOptions)
    ]
})

export class MysqlDatabaseProviderModule { }