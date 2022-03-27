const express = require('express')

const foodController = require('../controllers/food')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

// GET /foods
router.get('/', foodController.getAllFoods)

// //GET Single food item by ID
router.get('/:id', foodController.getFoodItem)

// POST /food
router.post('/add-food', isAuth, foodController.createFood)

// DELETE /food
router.delete('/delete/:id', isAuth, foodController.deleteFood)

module.exports = router