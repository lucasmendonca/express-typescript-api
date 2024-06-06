import { Request, Response } from "express";
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { userRepository } from "../repositories/user-repository"
import { getJwtSecret } from "../utils/jwt-secret";

class UserController {
  public async login(req: Request, res: Response) {
    const user = await userRepository.findByEmail(req.body.email)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Entity not found",
        data: null,
      });
    }

    const isEqual = await bcrypt.compare(req.body.password, user.password)

    if (!isEqual) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
        data: null,
      });
    }

    const token = jwt.sign(
      {
        id: user?.id,
        email: user.email,
        name: user.name,
      },
      getJwtSecret(),
      {
        expiresIn: "1h",
      }
    );

    return res.json({
      success: true,
      data: {
        id: user?.id,
        email: user.email,
        name: user.name,
        token: token,
      }
    });
  }
}

export const userController = new UserController();
