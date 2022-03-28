require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 8080
const authRoutes = require('./routes/auth')
const foodRoutes = require('./routes/food')

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Nutrition Plan API - CS341, Team 5',
            description: 'Final project. API information for nutrition plan API',
            contact: {
                name: 'BYU-I, CS341, Fall 2021, Team 5'
            },
            servers: ["http://localhost:8080"]
        }
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', (req,res)=>{
    res.send('Welcome to my Nutritional plan')
})

//mongodb connection example 
// adding a comment for a test
mongoose
    //.connect('mongodb+srv://healthNut32:workingHard@cluster0.7opmt.mongodb.net/DietData')
    .connect(process.env.MONGO_URL)
    .then(app.listen(PORT))
    .then(console.log('connected to database'))
    //heroku link: https://nutrition-plan2022.herokuapp.com/
    //.env file contains the following:
    //MONGO_URL=mongodb+srv://healthNut32:workingHard@cluster0.7opmt.mongodb.net/DietData
    //PORT=8080
    //secretKey=somesupersecretsecret
    
    .catch(err => console.log(err))