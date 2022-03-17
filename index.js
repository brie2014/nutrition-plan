const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth')
const foodRoutes = require('./routes/food')

const app = express()

app.use(bodyParser.json()) // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/auth', authRoutes)
app.use('/food', foodRoutes)

//mongodb connection example 
// adding a comment for a test
mongoose
    .connect('mongodb+srv://healthNut32:workingHard@cluster0.7opmt.mongodb.net/DietData')
    .then(app.listen(8080))
    .catch(err => console.log(err))