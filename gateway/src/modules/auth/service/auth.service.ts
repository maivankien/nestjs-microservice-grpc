import { ClientGrpc } from '@nestjs/microservices';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_SERVICE_NAME } from 'src/common/constants/microservice.constant';



@Injectable()
export class AuthService implements OnModuleInit {
    private svc: any

    @Inject(AUTH_SERVICE_NAME)
    private readonly client: ClientGrpc

    public onModuleInit(): void {
        this.svc = this.client.getService<any>(AUTH_SERVICE_NAME)
    }
}
