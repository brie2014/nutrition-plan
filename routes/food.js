const express = require('express')

const foodController = require('../controllers/food')

const router = express.Router()

// GET /foods
router.get('/', foodController.getAllFoods)

// POST /food
router.post('/add-food', foodController.createFood)


module.exports = router