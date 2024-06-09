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

    get productCommandServiceUrl(): string {
        return this.configService.get<string>('microservice.PRODUCT_COMMAND_SERVICE_URL')
    }

    get productCommandServicePathProto(): string {
        return this.configService.get<string>('microservice.PRODUCT_COMMAND_SERVICE_PATH_PROTO')
    }

    get productQueryServiceUrl(): string {
        return this.configService.get<string>('microservice.PRODUCT_QUERY_SERVICE_URL')
    }

    get productQueryServicePathProto(): string {
        return this.configService.get<string>('microservice.PRODUCT_QUERY_SERVICE_PATH_PROTO')
    }
}