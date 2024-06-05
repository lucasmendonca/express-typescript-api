import { Request, Response } from "express";
import { postRepository } from "../repositories/post-repository";

class PostController {
  public async list(req: Request, res: Response) {
    // TODO: paginate response
    const response = await postRepository.getAll();
    
    return res.json({
      data: response,
      success: true
    });
  }

  public async get(req: Request, res: Response) {
    const { id } = req.params;
    const response = await postRepository.getById(id);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Entity not found",
        data: null,
      });
    }

    return res.json({
      success: true,
      data: response,
    });
  }

  public create(req: Request, res: Response) {
    return res.json({
      response: "Post - Create",
    });
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const response = await postRepository.delete(id);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Entity not found",
        data: null,
      });
    }

    return res.json({
      success: true,
      data: response,
      message: "Post deleted with success"
    });
  }

  public update(req: Request, res: Response) {
    return res.json({
      success: true,
      data: "Post - Update",
    });
  }
}

export const postController = new PostController();
