import { ClientGrpc } from '@nestjs/microservices';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_SERVICE_NAME } from 'src/common/constants/microservice.constant';
import { AuthServiceClient, VerifyResponse } from '../proto/auth.proto';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class AuthService implements OnModuleInit {
    private service: AuthServiceClient

    constructor(
        @Inject(AUTH_SERVICE_NAME)
        private readonly client: ClientGrpc
    ) { }

    public onModuleInit(): void {
        this.service = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
    }

    public async verify(token: string): Promise<VerifyResponse> {
        return firstValueFrom(this.service.verify({ token }))
    }
}
