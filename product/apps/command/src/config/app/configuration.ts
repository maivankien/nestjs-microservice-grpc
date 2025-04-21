import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    COMMAND_GRPC_URL: process.env.COMMAND_GRPC_URL,
    COMMAND_PROTO_PATH: process.env.COMMAND_PROTO_PATH || "apps/proto/command.proto"
}))