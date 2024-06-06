import { Post } from "../models";

class PostRepository {
  public getById(id: number): Promise<Post|null> {
    return Post.findOne({
        where: { id }
    })
  }

  public getAll(): Promise<Post[]> {
    // TODO: paginate
    return Post.findAll()
  }

  public async delete(id: number): Promise<Post|null> {
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

  public async update(id: number, title: string, body: string, AuthorId: number): Promise<Post|null> {
    const post = await this.getById(id)

    if (!post) {
      return null
    }

    return post.update({ title, body, AuthorId });
  }
}

export const postRepository = new PostRepository();
