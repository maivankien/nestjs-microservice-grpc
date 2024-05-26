import * as bcrypt from 'bcrypt';


const SALT_ROUNDS = 10

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS)
}


export async function isPasswordValid(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
}
