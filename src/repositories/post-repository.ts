import { Post } from "../models";

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
     await post.destroy()
    }

    return post
  }

  public async create(title: string, body: string, authorId: number): Promise<Post> {
    const post = new Post({
      title:  title,
      body:  body,
      AuthorId: authorId
    })

    return await post.save()
  }
}

export const postRepository = new PostRepository();
