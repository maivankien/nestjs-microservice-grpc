import { registerAs } from '@nestjs/config';


export default registerAs('microservice', () => ({
    AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
    AUTH_SERVICE_PATH_PROTO: process.env.AUTH_SERVICE_PATH_PROTO || "proto/auth/auth.proto",

    PRODUCT_COMMAND_SERVICE_URL: process.env.PRODUCT_COMMAND_SERVICE_URL,
    PRODUCT_COMMAND_SERVICE_PATH_PROTO: process.env.PRODUCT_COMMAND_SERVICE_PATH_PROTO || "proto/product/product-command.proto",

    PRODUCT_QUERY_SERVICE_URL: process.env.PRODUCT_QUERY_SERVICE_URL,
    PRODUCT_QUERY_SERVICE_PATH_PROTO: process.env.PRODUCT_QUERY_SERVICE_PATH_PROTO || "proto/product/product-query.proto",
}))
