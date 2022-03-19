const Food = require('../models/food');

exports.getAllFoods = (req, res, next) => {
    Food.find()
    .then(allFoodItems => {
      console.log(allFoodItems);
      res.status(200).json({
          food: allFoodItems
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 404;
      return next(error);
    });
}

exports.getFoodItem = (req, res, next) => {
    const fId = req.params.id;
    Food.findById(fId)
    .then(food => {
        console.log(food);
        res.status(200).json({
          food: food
        });
    })
    .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
    });
}

exports.createFood = (req, res, next) => {
    //get food info from req
    const calories = req.body.calories
    const name = req.body.name
    const description = req.body.description
    const foodImageURL = req.body.imageURL

    // Create post in db
    const yumYum = new Food({
        calories: calories,
        name: name,
        description: description,
        imageURL: foodImageURL,
    })
    yumYum
    .save()
    .then(() => {
            res.status(201).json({
            message: 'Food added!',
        })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}



    //Return response with what was added to database and success message
    // res.status(201).json({
    //     message: 'Food created successfully!',
    //     post: {
    //         // posted data should go here
    //         "calories": "10,000",
    //         "name": "Heart Attack Burger",
    //         "description": "Turn Back... Don't do it! You have a family!",
    //         "imageURL": ""
    //     }
    // })