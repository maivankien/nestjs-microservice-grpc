import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @ApiProperty({
        example: 'test@gmaill.com'
    })
    @IsString()
    @IsEmail()
    email: string


    @ApiProperty({
        example: '123456'
    })
    @IsString()
    @MinLength(6)
    password: string
}


export class LoginDto {
    @ApiProperty({
        example: 'test@gmaill.com'
    })
    @IsString()
    @IsEmail()
    email: string


    @ApiProperty({
        example: '123456'
    })
    @IsString()
    @MinLength(6)
    password: string
}

export class TokenRequest {
    @IsString()
    @IsNotEmpty()
    token: string
}