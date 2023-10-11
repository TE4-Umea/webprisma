const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const product = await prisma.product.create({
        data: {
            id: 1,
            name: 'Fortnite Tröja',
            description: 'Fortnite Tröja',
            price: 39,
            quantity: 10,
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