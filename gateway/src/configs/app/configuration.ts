import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    env: process.env.API_GATEWAY_ENV,
    name: process.env.API_GATEWAY_NAME,
    url: process.env.API_GATEWAY_URL,
    port: process.env.API_GATEWAY_PORT
}))