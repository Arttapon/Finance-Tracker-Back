const {PrismaClient} =require('@prisma/client')
const prisma = new PrismaClient()

async function run() {
  await prisma.$executeRawUnsafe('DROP Database ccac01_connect')
  await prisma.$executeRawUnsafe('CREATE Database ccac01_connect')
}
console.log('Reset DB')
run()
