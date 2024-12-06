const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker")

async function main(){
    await prisma.post.deleteMany()
    
    const dataFaker = []
    
    const numberRandom = 20

    for (i = 0; i < numberRandom; i++){
        const data = {
            title: faker.lorem.words(4),
            content: faker.lorem.paragraph(),
            published: Math.random() > 0.5 ? false : true
        }
        dataFaker.push(data)
    }

    await prisma.post.createMany({
        data: dataFaker,
        skipDuplicates: true,
    })
    console.log(`Posts Creates`)
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
