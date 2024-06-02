import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(6)
    password: string
}

export class TokenRequest {
    @IsString()
    @IsNotEmpty()
    token: string
}