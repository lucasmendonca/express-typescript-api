import { Request, Response } from "express";

class PostController {
  public list(req: Request, res: Response) {
    return res.json({
      response: "Hello World - List",
    });
  }

  public get(req: Request, res: Response) {
    return res.json({
      response: "Post - Get",
    });
  }

  public create(req: Request, res: Response) {
    return res.json({
      response: "Post - Create",
    });
  }  

  public delete(req: Request, res: Response) {
    return res.json({
      response: "Post - Delete",
    });
  }  

  public update(req: Request, res: Response) {
    return res.json({
      response: "Post - Update",
    });
  }  
}

export const postController = new PostController();