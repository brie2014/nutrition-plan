const express = require("express");

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
router.post("/add-food", isAuth, foodController.createFood);

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
router.get("/:userId", isAuth, foodController.getAllUserFoods);

// UPDATE /food
router.put("/update/:id", isAuth, foodController.updateFood);

module.exports = router;
