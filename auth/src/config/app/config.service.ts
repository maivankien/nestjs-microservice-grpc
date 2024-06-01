import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) {}
    
    get grpcUrl(): string {
        return this.configService.get<string>('app.GRPC_URL')
    }

    get protoPath(): string {
        return this.configService.get<string>('app.PROTO_PATH')
    }

    get databaseHost(): string {
        return this.configService.get<string>('app.DATABASE_HOST')
    }

    get databasePort(): number {
        return Number(this.configService.get<string>('app.DATABASE_PORT'))
    }

    get databaseName(): string {
        return this.configService.get<string>('app.DATABASE_NAME')
    }

    get databaseUsername(): string {
        return this.configService.get<string>('app.DATABASE_USERNAME')
    }

    get databasePassword(): string {
        return this.configService.get<string>('app.DATABASE_PASSWORD')
    }

    get jwtSecret(): string {
        return this.configService.get<string>('app.JWT_SECRET')
    }
}