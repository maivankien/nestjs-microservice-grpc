import {
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    ExceptionFilter,
} from '@nestjs/common';


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const request = ctx.getRequest()

        let message: string | object
        let status = HttpStatus.INTERNAL_SERVER_ERROR

        if (exception instanceof HttpException) {
            status = exception.getStatus()
            message = exception.getResponse()

            if (typeof message === 'string') {
                message = { message }
            }

            return response.status(status).json(message)
        }

        if (exception instanceof Error && exception?.["code"] === "ENOENT") {
            status = HttpStatus.NOT_FOUND
            message = { message: 'Not found', statusCode: status }
            return response.status(status).json(message)
        }

        console.error(exception)

        response.status(status).json({
            statusCode: status,
            message: 'Internal server error',
            timestamp: new Date().toISOString(),
            path: request.url,
        })
    }
}