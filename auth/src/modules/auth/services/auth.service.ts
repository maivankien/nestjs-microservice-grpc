import { Repository } from "typeorm";
import { JwtService } from "./jwt.service";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpStatus, Injectable } from "@nestjs/common";
import { RegisterDto, TokenRequest } from "../presentation/dtos/auth.dto";
import { User } from "../presentation/entities/user.entity";
import { hashPassword, isPasswordValid } from "src/common/utils/common.util";
import { ERROR_MYSQL_DUPLICATE_KEY } from "src/common/constants/common.constant";
import { LoginResponse, RegisterResponse, VerifyResponse } from "../proto/auth.proto";


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    public async register(input: RegisterDto): Promise<RegisterResponse> {
        const user = {
            ...input,
            password: await hashPassword(input.password)
        } as User

        try {
            await this.userRepository.save(user)
            return { status: HttpStatus.CREATED, error: null }
        } catch (error) {
            if (error.code === ERROR_MYSQL_DUPLICATE_KEY) {
                return { status: HttpStatus.CONFLICT, error: ['Email already exists'] }
            }
            return { status: HttpStatus.INTERNAL_SERVER_ERROR, error: ['Internal server error'] }
        }
    }

    public async login(input: RegisterDto): Promise<LoginResponse> {
        const user: User = await this.userRepository.findOne({ where: { email: input.email } })

        if (!user) {
            return { status: HttpStatus.NOT_FOUND, error: ['Email not found'], token: null }
        }

        const isPasswordMatch = await isPasswordValid(input.password, user.password)

        if (!isPasswordMatch) {
            return { status: HttpStatus.UNAUTHORIZED, error: ['Invalid password'], token: null }
        }

        const token = this.jwtService.generateJwtToken(user)

        return { status: HttpStatus.OK, error: null, token: token }
    }

    public async verify(payload: TokenRequest): Promise<VerifyResponse> {
        const { token } = payload
        const decoded = await this.jwtService.verify(token)

        if (!decoded) {
            return { status: HttpStatus.UNAUTHORIZED, error: ['Invalid token'], userId: null }
        }

        const user: User = await this.userRepository.findOne({ where: { id: decoded.id } })

        if (!user) {
            return { status: HttpStatus.NOT_FOUND, error: ['User not found'], userId: null }
        }

        return { status: HttpStatus.OK, error: null, userId: user.id }
    }
}