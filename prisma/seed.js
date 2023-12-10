const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');



async function main() {
await prisma.post.deleteMany({});

    const numberOfPosts = 50;

    const posts = [];

    for (i = 0; i<numberOfPosts; i++) {
        const newPost = {
            title: faker.person.firstName(),
            content: faker.lorem.lines({ min: 1, max: 3 }),
            published: faker.datatype.boolean(),
        };
posts.push(newPost);
    }
    const addPost = async ()=> 
     await prisma.post.createMany({
        data: posts,
        skipDuplicates: true,
    });

    await addPost();
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

