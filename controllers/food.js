const Food = require('../models/food');

exports.getAllFoods = (req, res, next) => {
    // get food from db and return in res 
    // res.status(200).json({
    //     //food data goes here
    //     message: "All the good foods!"
    // })


    Food.find()
    .then(individualFoodItem => {
      console.log(individualFoodItem);
      res.status(200).json({
          food: individualFoodItem
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 404;
      return next(error);
    });
}

exports.createFood = (req, res, next) => {
    //get food info from req, for example
    //const foodName = req.body.foodName

    // Create post in db

    //Return response with what was added to database and success message
    res.status(201).json({
        message: 'Food created successfully!',
        post: {
            // posted data should go here
        }
    })
}