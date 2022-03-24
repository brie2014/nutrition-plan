const express = require('express')

const foodController = require('../controllers/food')

const router = express.Router()

// GET /foods
router.get('/', foodController.getAllFoods)

// //GET Single food item by ID
router.get('/:id', foodController.getFoodItem)

// POST /food
router.post('/add-food', foodController.createFood)


module.exports = router