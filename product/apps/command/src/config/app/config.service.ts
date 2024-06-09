import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) { }

    get grpcUrl(): string {
        return this.configService.get<string>('app.COMMAND_GRPC_URL')
    }

    get protoPath(): string {
        return this.configService.get<string>('app.COMMAND_PROTO_PATH')
    }

    get dataBaseUri(): string {
        return this.configService.get<string>('app.COMMAND_DATABASE_URL')
    }
}