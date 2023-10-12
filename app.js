const express = require('express')
const app = express()
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.use(cors())

app.get('/product', async function (req, res) {
  // fetch all products from DB and return as JSON
  // needs pagination
  // tvätta och sanera input
  const { page = 1, perPage = 10 } = req.query

  // https://www.prisma.io/docs/concepts/components/prisma-client/pagination

  const allProducts = await prisma.Product.findMany({
    skip: (Number(page) - 1) * Number(perPage),
    take: Number(perPage),
    include: {
      categories: true,
    },
  })

  let errors = []

  if (!allProducts) {
    errors.push({
      message: 'No products found',
    })
  }

  res.json({
    errors: errors,
    data: allProducts,
  })
})

app.get('/product/:id', async function (req, res) {
  // fetch a single product from DB and return as JSON

  const productId = req.params.id
  try {
    const product = await prisma.Product.findUnique({
      where: {
        id: Number(productId),
      },
      include: {
        categories: true,
      },
    })
    res.json({
      data: product,
    })
  } catch (error) {
    console.log(error)
    res.json({
      error: error,
    })
  }
})

app.listen(3000)