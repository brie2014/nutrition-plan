const express = require('express')

const foodController = require('../controllers/food')

const router = express.Router()

// GET /foods
router.get('/', foodController.getAllFoods)

// POST /food
router.post('/', foodController.createFood)


module.exports = router