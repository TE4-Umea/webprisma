const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Fortnite Tröja',
      description: 'Fortnite Tröja',
      price: 39,
      quantity: 10,
      categories: {
        create: [
          {
            category: {
              connectOrCreate: {
                create: {
                  name: 'Tröja',
                },
                where: {
                  name: 'Tröja',
                },
              },
            },
          },
          {
            category: {
              connectOrCreate: {
                create: {
                  name: 'Nytt',
                },
                where: {
                  name: 'Nytt',
                },
              },
            },
          },
        ],
      },
    },
  })
  console.log({ product })
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