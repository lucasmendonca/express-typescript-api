import Post from '../models/post'

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  // create tables
  await Post.sync({ force: true });
}
