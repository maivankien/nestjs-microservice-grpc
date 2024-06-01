export interface RegisterResponse {
    status: number
    error: string[]
}

export interface LoginResponse {
    status: number
    token: string
    error: string[]
}