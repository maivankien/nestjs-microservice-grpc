import { Response } from 'express';
import { firstValueFrom } from "rxjs";
import { ApiTags } from "@nestjs/swagger";
import { RegisterDto } from "../dtos/auth.dto";
import { ClientGrpc } from "@nestjs/microservices";
import { AuthServiceClient } from "../proto/auth.proto";
import { AUTH_SERVICE_NAME } from "src/common/constants/microservice.constant";
import { Body, Controller, HttpStatus, Inject, OnModuleInit, Post, Res } from "@nestjs/common";

@ApiTags('auth')
@Controller('auth')
export class AuthController implements OnModuleInit {
    private service: AuthServiceClient

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

            if (result.status == HttpStatus.CREATED) {
                return res.status(HttpStatus.CREATED).json(result)

            }
            return res.status(result.status).json(result)
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: ['Internal Server Error'] })
        }
    }
}