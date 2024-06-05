import { Request, Response } from "express";
import { postRepository } from "../repositories/post-repository";

class PostController {
  public async list(req: Request, res: Response) {
    // TODO: paginate response
    const response = await postRepository.getAll();
    
    return res.json({
      data: response
    });
  }

  public async get(req: Request, res: Response) {
    const { id } = req.params;
    const response = await postRepository.getById(id);

    if (!response) {
      return res.status(404).json({
        error: "Not found",
        data: null,
      });
    }

    return res.json({
      data: response,
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
