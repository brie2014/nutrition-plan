require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI;
const authRoutes = require('./routes/auth')
const foodRoutes = require('./routes/food')

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        tags: [
            {
                "name": "Authentication",
                "description": "Endpoints"
            },
            {
                "name": "Food",
                "description": "Endpoints"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
              },
            },
        },
        info: {
            title: 'Nutrition Plan API - CS341, Team 5',
            version: '1.0.0',
            description: 'Final project. API information for nutrition plan API',
            contact: {
                name: 'BYU-I, CS341, Fall 2021, Team 5'
            },
            // servers: ["localhost:5000"]
            servers: [process.env.SWAG_SERVER]
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

// Start server
mongoose
    .connect(MONGODB_URI)
    .then(app.listen(PORT))
    .then(console.log('connected to database'))
    
    .catch(err => console.log(err))