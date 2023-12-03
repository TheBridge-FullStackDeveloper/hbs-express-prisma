const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany({});

  const numberOfPosts = 50;
  const posts = [];

  for (let i = 0; i < numberOfPosts; i++) {
    const createdAtTime = faker.date.past();
    const updatedAtTime = new Date(createdAtTime.getTime() + Math.random() * (new Date().getTime() - createdAtTime.getTime()));
    const post = {
      createdAt: createdAtTime,
      updatedAt: updatedAtTime,
      title: faker.lorem.words({ min: 5, max: 8 }),
      content: faker.lorem.paragraphs({ min: 2, max: 5 }),
      published: faker.datatype.boolean(0.75),
    };
    posts.push(post);
  }

  const addPosts = async () => {
    await prisma.post.createMany({
      data: posts,
      skipDuplicates: true,
    });
  };

  await addPosts();
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