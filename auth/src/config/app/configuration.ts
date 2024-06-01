import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    JWT_SECRET: process.env.JWT_SECRET,

    GRPC_URL: process.env.GRPC_URL,
    PROTO_PATH: process.env.PROTO_PATH || "proto/auth.proto",

    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
}))