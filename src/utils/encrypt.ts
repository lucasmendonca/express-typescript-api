import * as bcrypt from "bcrypt";

export async function encrypt(value: string) : Promise<string> {
    return await bcrypt.hash(value, 10)
}