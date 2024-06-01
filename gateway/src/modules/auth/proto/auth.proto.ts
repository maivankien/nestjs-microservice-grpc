import { Observable } from "rxjs";
import { LoginDto, RegisterDto } from "../dtos/auth.dto";

export interface RegisterResponse {
    status: number
    error: string[]
}

export interface LoginResponse {
    status: number
    token: string
    error: string[]
}

export interface AuthServiceClient {
    login(request: LoginDto): Observable<LoginResponse>

    register(request: RegisterDto): Observable<RegisterResponse>
}