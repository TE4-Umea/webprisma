const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    for (let i = 0; i < 100; i++) {
        const product = await prisma.product.create({
            data: {
                name: `Product ${i}`,
                description: 'Fortnite Tröja',
                price: Math.random() * 1000,
                quantity: Math.random() * 10,
                sizes : 'M',
                categories: {
                    create: [
                        {
                            category: {
                                connectOrCreate: {
                                    create: {
                                        name: 'Man',
                                    },
                                    where: {
                                        name: 'Man',
                                    },
                                },
                            },
                        },
                        {
                            category: {
                                connectOrCreate: {
                                    create: {
                                        name: 'Tröjor',
                                    },
                                    where: {
                                        name: 'Tröjor',
                                    },
                                },
                            },
                        },
                    ],
                },
            },

        })
    }

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