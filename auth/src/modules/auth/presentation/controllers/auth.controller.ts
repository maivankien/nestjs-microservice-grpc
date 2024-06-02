import { Controller } from "@nestjs/common";
import { RegisterDto, TokenRequest } from "../dtos/auth.dto";
import { GrpcMethod } from "@nestjs/microservices";
import { AuthService } from "../../services/auth.service";
import { RegisterResponse, VerifyResponse } from "../../proto/auth.proto";
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

    @GrpcMethod(AUTH_SERVICE_NAME, 'login')
    private async login(payload: RegisterDto): Promise<RegisterResponse> {
        return this.authService.login(payload)
    }

    @GrpcMethod(AUTH_SERVICE_NAME, 'verify')
    private async verify(payload: TokenRequest): Promise<VerifyResponse> {
        return this.authService.verify(payload)
    }
}