const prisma = require('./index');
const { faker } = require('@faker-js/faker');

async function populateDb(amount) {
    const userArray = [];
    for (let i = 0; i < amount; i++) {
        userArray.push( {
            title: faker.lorem.words(),
            content: faker.lorem.lines(),
            published: faker.datatype.boolean(0.7)
    });
    }
    await prisma.post.createMany({ data: userArray });
}

populateDb(50)
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });