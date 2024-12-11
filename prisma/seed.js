const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.post.createMany({
    data: [
      { title: 'Primer Post', content: 'Contenido del primer post', published: true },
      { title: 'Segundo Post', content: 'Contenido del segundo post', published: false },
    ],
  });
  console.log('Base de datos inicializada.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
