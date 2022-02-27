const express = require('express')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/user')
const foodRoutes = require('./routes/food')

const app = express()

app.use(bodyParser.json()) // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

// app.use('/user', userRoutes)
app.use('/food', foodRoutes)

app.listen(8080)