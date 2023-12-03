const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');



const prisma = new PrismaClient();

async function main() {
  const posts = [];

  for (let i = 0; i < 30; i++) {
    posts.push({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      published: faker.datatype.boolean(),
    });
  }

  for (const post of posts) {
    await prisma.post.create({
      data: post,
    });
  }

  console.log('30 posts falsos creados.');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
