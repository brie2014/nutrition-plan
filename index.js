require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 8080
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

const cors = require('cors') 
const corsOptions = {
    origin: "https://nutrition-plan2022.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};

app.use('/auth', authRoutes)
app.use('/food', foodRoutes)
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
    //.env files contains the following:
    //MONGO_URL=mongodb+srv://healthNut32:workingHard@cluster0.7opmt.mongodb.net/DietData
    //PORT=8080
    //secretKey=somesupersecretsecret
    
    .catch(err => console.log(err))