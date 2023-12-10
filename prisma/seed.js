const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');

async function main() {
  await prisma.post.deleteMany({});
    const numberOfPost = 50;

    const arrayPost = [];

    for (i = 0; i < numberOfPost; i++) {
        const newPost = {
            title: faker.person.firstName(),
            content: faker.lorem.lines({ min: 1, max: 3 }),
            published: faker.datatype.boolean(),
        };
post.push(newPost);
    }
    const addPost = async () =>
    await prisma.post.createMany({
        data: arrayPost,
        skipDuplicates: true,
    });

    addPost();
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
