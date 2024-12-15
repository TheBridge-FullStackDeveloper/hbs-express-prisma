const { prismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create 10 users
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        title: faker.lorem.sentence(), // Generate a random title
        content: faker.lorem.paragraph(), // Generate a random content
        published: faker.datatype.boolean(), // Generate a random boolean value
        createdAt: faker.date.past(), // Generate a random past date
        updatedAt: faker.date.recent(), // Generate a random recent date
      },
    });
  }
  console.log('Database seeded!');	
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
