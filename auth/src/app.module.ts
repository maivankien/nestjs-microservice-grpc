import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { MysqlDatabaseProviderModule } from './modules/auth/infrastructure/database/mysql/provider.module';

@Module({
    imports: [
        AuthModule,
        AppConfigModule,
        MysqlDatabaseProviderModule
    ]
})
export class AppModule { }
