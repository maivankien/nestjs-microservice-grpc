import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandController } from './command.controller';
import { AppConfigModule } from './config/app/config.module';
import { CreateProductModule } from './modules/create/create.module';
import { UpdateProductModule } from './modules/update/update.module';

@Module({
    imports: [
        AppConfigModule,
        CreateProductModule,
        UpdateProductModule
    ],
    controllers: [CommandController],
    providers: [CommandService],
})
export class CommandModule { }
