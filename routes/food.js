const express = require("express");
const {
    body
} = require('express-validator')

const foodController = require("../controllers/food");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// GET /foods
/** 
 * @swagger
 * /food:
 *  get:
 *      tags: ['Food']
 *      description: Returns All Foods
 *      responses:
 *          '200':
 *              description: List of all foods
 *          '404':
 *              description: Not found.
 */ 
router.get("/", foodController.getAllFoods);

// //GET Single food item by ID
/** 
 * @swagger
 * /food/{fId}:
 *  get:
 *      tags: ['Food']
 *      description: Returns a single food
 *      parameters:
 *        - in: path
 *          name: fId
 *          required: true
 *          description: The id of the food to be found
 *      responses:
 *          '200':
 *              description: Food found and returned
 *          '404':
 *              description: Food not found.
 *          '500':
 *              description: System error.
 */ 
router.get("/:id", foodController.getFoodItem);

// POST /food
/** 
 * @swagger
 * /food/add-food:
 *  post:
 *      tags: ['Food']
 *      description: Add a food to the list
 *      parameters:
 *        - in: cookie
 *          name: debug
 *          schema:
 *              type: integer
 *              enum: [0, 1]
 *              default: 0
 *        - in: cookie
 *          name: csrftoken
 *          schema:
 *              type: string
 *      responses:
 *          '201':
 *              description: Food added to list
 *          '500':
 *              description: System Error.
 */ 
router.post("/add-food", isAuth, [
    body('calories').trim().not().isEmpty(),
    body('name').trim().not().isEmpty(),
    body('description').trim().not().isEmpty(),
    body('imageURL').trim().not().isEmpty()
], foodController.createFood);


// DELETE /food
/** 
 * @swagger
 * /food/delete/{fId}:
 *  delete:
 *      tags: ['Food']
 *      description: Delete a single food
 *      parameters:
 *        - in: path
 *          name: fId
 *          required: true
 *          description: The id of the food to be deleted
 *      responses:
 *          '200':
 *              description: Food deleted.
 *          '403':
 *              description: User not authorized to delete food.
 *          '404':
 *              description: Food not found.
 *          '500':
 *              description: System error.
 */ 
router.delete("/delete/:id", isAuth, foodController.deleteFood);

// Get foods for a user
/** 
 * @swagger
 * /food/user/{userId}:
 *  get:
 *      tags: ['Food']
 *      description: Returns all foods for a user
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          description: The id of the user
 *      responses:
 *          '200':
 *              description: All user food returned
 *          '404':
 *              description: Food not found.
 */ 
router.get("/user/:userId", isAuth, foodController.getAllUserFoods);

// UPDATE /food
/** 
 * @swagger
 * /food/update/{fId}:
 *  put:
 *      tags: ['Food']
 *      description: Edit a single food
 *      parameters:
 *        - in: path
 *          name: fId
 *          required: true
 *          description: The id of the food to be edited
 *      responses:
 *          '200':
 *              description: Food updated.
 *          '403':
 *              description: User not authorized to delete food.
 *          '404':
 *              description: Food not found.
 *          '500':
 *              description: System error.
 */ 
router.put("/update/:id", isAuth, [
    body('calories').trim().not().isEmpty(),
    body('name').trim().not().isEmpty(),
    body('description').trim().not().isEmpty(),
    body('imageURL').trim().not().isEmpty()
], foodController.updateFood);

module.exports = router;
