import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./presentation/controllers/auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./presentation/entities/user.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    providers: [AuthService, AuthController],
    controllers: [AuthController]
})
export class AuthModule { }