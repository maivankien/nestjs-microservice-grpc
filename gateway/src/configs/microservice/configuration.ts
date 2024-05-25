import { registerAs } from '@nestjs/config';


export default registerAs('microservice', () => ({
    AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
    AUTH_SERVICE_PATH_PROTO: process.env.AUTH_SERVICE_PATH_PROTO || "proto/auth.proto",
}))
