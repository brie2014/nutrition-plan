const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  calories: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model('food', foodSchema);