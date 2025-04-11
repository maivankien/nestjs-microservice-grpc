import { AuthService } from "../service/auth.service";
import { CustomRequest } from "src/common/interfaces/auth.interface";
import { CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService
    ) { }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: CustomRequest = context.switchToHttp().getRequest()

        const authorization: string = req.headers['authorization']

        if (!authorization) {
            throw new UnauthorizedException()
        }

        const bearer: string[] = authorization.split(' ')

        if (!bearer || bearer.length < 2) {
            throw new UnauthorizedException()
        }

        const token: string = bearer[1]
        const { status, userId } = await this.authService.verify(token)

        if (status !== HttpStatus.OK) {
            throw new UnauthorizedException()
        }

        req.user = userId

        return true
    }
}