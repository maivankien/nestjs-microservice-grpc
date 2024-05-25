import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MicroserviceConfigModule } from "src/configs/microservice/config.module";
import { MicroserviceConfigService } from "src/configs/microservice/config.service";
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from "src/common/constants/microservice.constant";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: AUTH_SERVICE_NAME,
                imports: [MicroserviceConfigModule],
                useFactory: async (configService: MicroserviceConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: AUTH_PACKAGE_NAME,
                        url: configService.authServiceUrl,
                        protoPath: configService.authServicePathProto,
                    },
                }),
                inject: [MicroserviceConfigService],
            },
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule { }
