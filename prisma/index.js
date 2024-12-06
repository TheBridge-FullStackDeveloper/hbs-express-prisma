const { PrismaClient } = require('@prisma/client'); //importamos PrismaClient de @prisma/client
const prisma = new PrismaClient(); //instanciamos prisma

module.exports = prisma; //exportamos la instancia de prisma