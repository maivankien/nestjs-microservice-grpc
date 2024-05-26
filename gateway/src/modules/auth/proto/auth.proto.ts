import { Observable } from "rxjs";
import { RegisterDto } from "../dtos/auth.dto";

export interface RegisterResponse {
    status: number
    error: string[]
}

export interface AuthServiceClient {
    register(request: RegisterDto): Observable<RegisterResponse>
}