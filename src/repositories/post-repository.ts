import { Post } from "../models/post";

class PostRepository {
  public getById(id: string): Promise<Post|null> {
    return Post.findOne({
        where: { id }
    })
  }

  public getAll(): Promise<Post[]> {
    // TODO: paginate
    return Post.findAll()
  }

  public async delete(id: string): Promise<Post|null> {
    const post = await this.getById(id)
    
    if (post) {
      post.destroy()
    }

    return post
  }
}

export const postRepository = new PostRepository();
