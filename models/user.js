const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        rquired: true
    },
    password: {
        type: String,
        rquired: true
    },
    name: {
        type: String,
        rquired: true
    },
    foods: [{
        type: Schema.Types.ObjectId,
        ref: 'Food'
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)