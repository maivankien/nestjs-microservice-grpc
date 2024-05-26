import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpStatus, Injectable } from "@nestjs/common";
import { RegisterDto } from "../presentation/dtos/auth.dto";
import { User } from "../presentation/entities/user.entity";
import { hashPassword } from "src/common/utils/common.util";
import { RegisterResponse } from "../proto/auth.proto";


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
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
            if (error.code === "ER_DUP_ENTRY") {
                return { status: HttpStatus.CONFLICT, error: ['Email already exists'] }
            }
            return { status: HttpStatus.INTERNAL_SERVER_ERROR, error: ['Internal server error'] }
        }
    }
}