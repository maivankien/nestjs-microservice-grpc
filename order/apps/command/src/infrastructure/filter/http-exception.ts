import {
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException) {        
        const status = exception.getStatus()
        const error = exception.getResponse()
        const timestamp: string = new Date().toISOString()


        if (typeof error === 'string') {
            return { status, timestamp, error: [error] }
        }

        return { status, timestamp, error: [error["message"]] }
    }
}
