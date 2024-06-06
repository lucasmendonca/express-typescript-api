import { Post, User } from "../models";
import { encrypt } from "../utils/encrypt";

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

export async function seed() {
  // Create tables
  await User.sync({ force: true });
  await Post.sync({ force: true });

  const password = await encrypt("12345");

  // Insert data
  await Promise.all([
    User.create({
      id: 1,
      name: "Lucas",
      email: "lucas@test.com",
      password: password,
    }),
    User.create({
      id: 2,
      name: "John",
      email: "john@test.com",
      password: password,
    }),
    Post.create({
      id: 1,
      title: "Hello world post",
      body: "My fist post",
      AuthorId: 1,
    }),
    Post.create({
      id: 2,
      title: "Secound blog post",
      body: "Finally, my 2nd post!",
      AuthorId: 1,
    }),
  ]);
}
