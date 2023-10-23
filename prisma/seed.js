const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const { faker } = require('@faker-js/faker')

function randomProduct() {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    sizes: "Large",
    image: faker.image.urlPicsumPhotos({
      grayscale: true,
      height: 256,
      width: 256,
    }),
    categories: {
      create: [
        {
          category: {
            connectOrCreate: {
              create: {
                name: faker.commerce.product(),
              },
              where: {
                name: faker.commerce.product(),
              },
            },
          },
        },
      ],
    },
  }
}

async function main() {
  for (let i = 0; i < 100; i++) {
    try {
      await prisma.product.create({
        data: randomProduct(),
      })
    } catch (e) {
      console.error(e)
    }
  }
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