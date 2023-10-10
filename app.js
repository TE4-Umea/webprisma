const express = require('express')
const app = express()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors')

app.use(cors())

app.get('/', async function (req, res) {
    res.json({
    })
})

app.listen(3000)
