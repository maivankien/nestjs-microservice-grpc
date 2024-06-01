import { Injectable } from "@nestjs/common";
import { JwtService as Jwt } from '@nestjs/jwt';
import { User } from "../presentation/entities/user.entity";


@Injectable()
export class JwtService {
    constructor(
        private readonly jwt: Jwt
    ) { }


    public async verify(token: string): Promise<User> {
        return this.jwt.verify(token)
    }

    public generateJwtToken(payload: User): string {
        return this.jwt.sign({ id: payload.id, email: payload.email })
    }

    public generateJwtTokenWithExpiration(payload: User, expiresIn: string): string {
        return this.jwt.sign({ id: payload.id, email: payload.email }, { expiresIn: expiresIn })
    }
}