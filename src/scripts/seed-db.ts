import { Post, User } from "../models";
// import { User } from "../models/user";
// import * as User from "../models/user";

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  // Create tables
  await User.sync({ force: true });
  await Post.sync({ force: true });

  // Insert data
  await Promise.all([
    User.create({
      id: 1,
      name: "Lucas",
      email: "lucas@test.com",
      password: "123456",
    }),
    User.create({
      id: 2,
      name: "John",
      email: "john@test.com",
      password: "Wizard",
    }),
    Post.create({
      id: 1, 
      title: "Hello world post",
      body: "My fist post",
      AuthorId: 1
    }),
    Post.create({
      id: 2, 
      title: "Secound blog post",
      body: "Finally, my 2nd post!",
      AuthorId: 1
    }),
  ]);

  await Promise.all([
    Post.create({
      id: 1, 
      title: "Hello world post",
      body: "My fist post",
      authorId: 1
    }),
    Post.create({
      id: 2, 
      title: "Secound blog post",
      body: "Finally, my 2nd post!",
      authorId: 1
    }),
  ]);
}
