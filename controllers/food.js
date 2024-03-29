const Food = require("../models/food");
const User = require("../models/user");

exports.getAllFoods = (req, res, next) => {
  Food.find()
    .then((allFoodItems) => {
      console.log(allFoodItems);
      res.status(200).json({
        food: allFoodItems,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 404;
      return next(error);
    });
};

exports.getFoodItem = (req, res, next) => {
  const fId = req.params.id;
  Food.findById(fId)
    .then((food) => {
      if (!food) {
        const error = new Error("Could not find food");
        error.statusCode = 404;
        throw error;
      }
      console.log(food);
      res.status(200).json({
        food: food,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.createFood = (req, res, next) => {
  //get food info from req
  const calories = req.body.calories;
  const name = req.body.name;
  const description = req.body.description;
  const foodImageURL = req.body.imageURL;

  // Create post in db
  const food = new Food({
    calories: calories,
    name: name,
    description: description,
    imageURL: foodImageURL,
    creator: req.userId,
  });
  food
    .save()
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      creator = user;
      user.foods.push(food);
      return user.save();
    })
    .then(() => {
      res.status(201).json({
        message: "Food added!",
        food: food,
        creator: {
          _id: creator._id,
          name: creator.name,
        },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteFood = (req, res, next) => {
  const fId = req.params.id;
  Food.findById(fId)
    .then((food) => {
      if (!food) {
        const error = new Error("Could not find food");
        error.statusCode = 404;
        throw error;
      }
      if (food.creator.toString() !== req.userId) {
        const error = new Error(
          "You do not have permission to delete this food."
        );
        error.statusCode = 403;
        throw error;
      }
      return Food.findByIdAndRemove(fId);
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Successfully deleted",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getAllUserFoods = (req, res, next) => {
  const userId = req.params.userId;
  console.log(typeof userId);
  Food.find({ creator: userId })
    .then((userFoods) => {
      res.status(200).json({
        food: userFoods,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 404;
      return next(error);
    });
};

exports.updateFood = (req, res, next) => {
  const fId = req.params.id;
  const calories = req.body.calories;
  const name = req.body.name;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
 
  Food.findById(fId)
    .then(food => {
      if (!food){
        const error = new Error('Did not find the food.');
        error.statusCode = 404;
        throw error;
      }
      if (food.creator.toString() !== req.userId) {
        const error = new Error(
          "You do not have permission to update this food."
        );
        error.statusCode = 403;
        throw error;
      }
      food.calories = calories;
      food.name = name;
      food.description = description;
      food.imageUrl = imageUrl;
      return food.save(); 
    })
    .then(result => {
      res.status(200).json({ message: 'Food updated!', food: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
