import { Response } from 'express';
import { firstValueFrom } from "rxjs";
import { ApiTags } from "@nestjs/swagger";
import { LoginDto, RegisterDto } from "../dtos/auth.dto";
import { ClientGrpc } from "@nestjs/microservices";
import { AuthServiceClient } from "../proto/auth.proto";
import { AUTH_SERVICE_NAME } from "src/common/constants/microservice.constant";
import { Body, Controller, HttpStatus, Inject, Logger, OnModuleInit, Post, Res } from "@nestjs/common";

@ApiTags('auth')
@Controller('auth')
export class AuthController implements OnModuleInit {
    private service: AuthServiceClient
    private readonly logger = new Logger(AuthController.name)

    constructor(
        @Inject(AUTH_SERVICE_NAME)
        private readonly client: ClientGrpc
    ) { }

    public onModuleInit(): void {
        this.service = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
    }


    @Post('register')
    async register(@Body() body: RegisterDto, @Res() res: Response) {
        try {
            const result = await firstValueFrom(this.service.register(body))

            if (result.status === HttpStatus.CREATED) {
                return res.status(HttpStatus.CREATED).json(result)

            }
            return res.status(result.status).json(result)
        } catch (error) {
            this.logger.error('Error during register', error.stack)
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: ['Internal Server Error'],
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            })
        }
    }

    @Post('login')
    async login(@Body() body: LoginDto, @Res() res: Response) {
        try {
            const result = await firstValueFrom(this.service.login(body))

            if (result.status === HttpStatus.OK) {
                return res.status(HttpStatus.OK).json(result)
            }
            return res.status(result.status).json(result)
        } catch (error) {
            this.logger.error('Error during login', error.stack)
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                token: null,
                error: ['Internal server error'],
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            })
        }
    }
}