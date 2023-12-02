const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();
​
async function main() {
  await prisma.post.deleteMany({}); // <- Borra nada mas ejecutarse
  const numberOfPosts = 50;
​
  const posts = [];
​
  for (i = 0; i < numberOfPosts; i++) {
    const createdAtTime = faker.date.past();
    const post = {
      createdAt: createdAtTime,
      updatedAt: faker.date.between({ from: createdAtTime, to: new Date().toISOString }),
      title: faker.lorem.words({ min: 5, max: 8 }),
      content: faker.lorem.paragraphs({ min: 2, max: 5 }),
      published: faker.datatype.boolean(0.9),
    };
    posts.push(post);
  }
​
  const addPosts = async () =>
    await prisma.post.createMany({
      data: posts,
      skipDuplicates: true,
    });
​
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