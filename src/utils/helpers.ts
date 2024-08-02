import { Request } from "express";
import { AuthenticatedUser } from "../models";

export function getAuthenticatedUser(req: Request): AuthenticatedUser {
    return req.headers["payload"] as unknown as AuthenticatedUser;
}