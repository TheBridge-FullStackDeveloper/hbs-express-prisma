const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function main() {
  await prisma.Post.deleteMany({}); // <- Borra nada mas ejecutarse
  const numberOfPosts = 50;

  const posts = [];

  for (i = 0; i < numberOfPosts; i++) {
    const post = {
        title: faker.hacker.noun(),
        content: faker.hacker.phrase(),
        published: faker.datatype.boolean()
    };
    posts.push(post);
  }

  const addPosts = async () =>
    await prisma.Post.createMany({
      data: posts,
      skipDuplicates: true,
    });

  addPosts();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });