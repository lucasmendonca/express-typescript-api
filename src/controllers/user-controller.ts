import { Request, Response } from 'express';

class UserController {
  public auth(req: Request, res: Response) {
    return res.json({
      response: "Users - Auth",
    });
  }

  public get(req: Request, res: Response) {
    return res.json({
      response: "Users - Get",
    });
  }
}

export const postController = new UserController();