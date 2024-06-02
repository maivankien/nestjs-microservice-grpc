import { Observable } from "rxjs";
import { LoginDto, RegisterDto, TokenRequest } from "../dtos/auth.dto";

export interface RegisterResponse {
    status: number
    error: string[]
}

export interface LoginResponse {
    status: number
    token: string
    error: string[]
}

export interface VerifyResponse {
    status: number
    error: string[]
    userId: string
}

export interface AuthServiceClient {
    login(request: LoginDto): Observable<LoginResponse>
    verify(request: TokenRequest): Observable<VerifyResponse>
    register(request: RegisterDto): Observable<RegisterResponse>
}