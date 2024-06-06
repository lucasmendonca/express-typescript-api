import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "../utils/jwt-secret";

export function authChecker(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");
  const jwtSecret = getJwtSecret();

  try {
    if (!token) {
      throw Error("Not found token");
    }

    const payload: any = jwt.verify(token, jwtSecret)
    req.headersDistinct["payload"] = payload;
    next();
    
  } catch (err) {
    console.log("Error when authenticating user")
    res.status(401).json({
      success: false,
      message: "Access Denied! Plesse provide a valid token.",
      data: null,
    });
  }
}
