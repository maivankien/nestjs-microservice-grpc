import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MicroserviceConfigService {
    constructor(
        private readonly configService: ConfigService
    ) { }

    get authServiceUrl(): string {
        return this.configService.get<string>('microservice.AUTH_SERVICE_URL')
    }

    get authServicePathProto(): string {
        return this.configService.get<string>('microservice.AUTH_SERVICE_PATH_PROTO')
    }
}