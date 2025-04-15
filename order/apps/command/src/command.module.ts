import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CreateOrderModule } from './modules/create/create.module';
import { EventSourcingModule } from 'nestjs-event-sourcing';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        EventSourcingModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                mongoUrl: config.get('COMMAND_MONGO_URL'),
            }),
            inject: [ConfigService],
        }),
        CreateOrderModule,
    ],
})
export class CommandModule { }
