import { Controller } from "@nestjs/common";
import { RegisterDto } from "../dtos/auth.dto";
import { GrpcMethod } from "@nestjs/microservices";
import { AuthService } from "../../services/auth.service";
import { RegisterResponse } from "../../proto/auth.proto";
import { AUTH_SERVICE_NAME } from "src/common/constants/microservice.constant";


@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @GrpcMethod(AUTH_SERVICE_NAME, 'register')
    private async register(payload: RegisterDto): Promise<RegisterResponse> {
        return this.authService.register(payload)
    }
}