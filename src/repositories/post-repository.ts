import { Post } from "../models/post";

class PostRepository {
  public getById(id: string): Promise<Post|null> {
    return Post.findOne({
        where: { id }
    })
  }

  public getAll(): Promise<Post[]> {
    return Post.findAll()
  }
}

export const postRepository = new PostRepository();
