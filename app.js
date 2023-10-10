const express = require('express')
const app = express()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors')

app.use(cors())
 
app.get('/', async function (req, res) {

    await prisma.Items.create ({
        data: {
            id : 1,
            name: 'Item 1',
            price: 1000,
            quantity: 10,
            sizes: 'M'
        }
    })  

    await prisma.Users.create ({
        data: {
            id : 1,
            name: 'User 1',
            email: 'email@email.com',
            password: 'password',
            address: 'addrees1',
            role: 'user',
        }
    })
})

app.listen(3000)
