import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string


    @ApiProperty()
    @IsString()
    @MinLength(6)
    password: string
}


export class LoginDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string


    @ApiProperty()
    @IsString()
    @MinLength(6)
    password: string
}

export class TokenRequest {
    @IsString()
    @IsNotEmpty()
    token: string
}