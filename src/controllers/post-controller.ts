import { Request, Response } from "express";
import { postRepository } from "../repositories/post-repository";

class PostController {
  public async list(req: Request, res: Response) {
    // TODO: paginate response
    const response = await postRepository.getAll();

    return res.json({
      data: response,
      success: true,
    });
  }

  public async get(req: Request, res: Response) {
    const { id } = req.params;
    const response = await postRepository.getById(Number(id));

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

  public async create(req: Request, res: Response) {
    const response = await postRepository.create(
      req.body.title,
      req.body.body,
      req.body.AuthorId
    );

    return res.json({
      success: true,
      message: "Post created with success",
      data: response,
    });
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const response = await postRepository.delete(Number(id));

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
      message: "Post deleted with success",
    });
  }

  public async update(req: Request, res: Response) {
    const response = await postRepository.update(
      Number(req.params.id),
      req.body.title,
      req.body.body,
      req.body.AuthorId
    );

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Entity not found",
        data: null,
      });
    }

    return res.json({
      success: true,
      message: "Post updated with success",
      data: response,
    });
  }
}

export const postController = new PostController();
