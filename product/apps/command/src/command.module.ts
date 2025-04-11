import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandService } from './command.service';
import { CommandController } from './command.controller';
import { AppConfigModule } from './config/app/config.module';
import { CreateProductModule } from './modules/create/create.module';
import { UpdateProductModule } from './modules/update/update.module';
import { EventSourcingModule } from 'nestjs-event-sourcing';

@Module({
    imports: [
        AppConfigModule,
        CreateProductModule,
        UpdateProductModule,
        EventSourcingModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                mongoUrl: config.get('COMMAND_MONGO_URL')
            })
        })
    ],
    controllers: [CommandController],
    providers: [CommandService],
})
export class CommandModule { }
