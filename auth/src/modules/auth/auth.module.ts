import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtService } from "./services/jwt.service";
import { AuthService } from "./services/auth.service";
import { User } from "./presentation/entities/user.entity";
import { AppConfigModule } from "src/config/app/config.module";
import { AppConfigService } from "src/config/app/config.service";
import { EXPRIRED_TOKEN } from "src/common/constants/common.constant";
import { AuthController } from "./presentation/controllers/auth.controller";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [AppConfigModule],
            inject: [AppConfigService],
            useFactory: async (config: AppConfigService) => ({
                secret: config.jwtSecret,
                signOptions: { expiresIn: EXPRIRED_TOKEN }
            })
        }),
        TypeOrmModule.forFeature([User])
    ],
    providers: [AuthService, AuthController, JwtService],
    controllers: [AuthController]
})

export class AuthModule { }