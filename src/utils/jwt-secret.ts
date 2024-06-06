export function getJwtSecret(): string {
    return process.env.jwtSecret || "defaultSecret"
}