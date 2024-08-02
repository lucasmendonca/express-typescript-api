import { Request, Response } from "express";
import { postRepository } from "../repositories/post-repository";
import { getAuthenticatedUser } from "../utils/helpers";

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
    const payload = getAuthenticatedUser(req);
    const loggedId: number = payload.id;

    if (loggedId != req.body.AuthorId) {
      return res.status(403).json({
        success: false,
        message: "Use cannot create posts on behalf of another author",
        data: null,
      });
    }

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
    const id = Number(req.params.id);
    const user = getAuthenticatedUser(req);
    const post = await postRepository.getById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Entity not found",
        data: null,
      });
    }

    if (user.id != post.AuthorId) {
      return res.status(403).json({
        success: false,
        message: "Use cannot delete posts on behalf of another author",
        data: null,
      });
    }

    const response = await postRepository.delete(id);

    return res.json({
      success: true,
      data: response,
      message: "Post deleted with success",
    });
  }

  public async update(req: Request, res: Response) {
    const user = getAuthenticatedUser(req);
    const id = Number(req.params.id);

    const post = await postRepository.getById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Entity not found",
        data: null,
      });
    }

    if (user.id != post.AuthorId) {
      return res.status(403).json({
        success: false,
        message: "Use cannot update posts on behalf of another author",
        data: null,
      });
    }

    const response = await postRepository.update(
      Number(req.params.id),
      req.body.title,
      req.body.body,
      req.body.AuthorId
    );

    return res.json({
      success: true,
      message: "Post updated with success",
      data: response,
    });
  }
}

export const postController = new PostController();
