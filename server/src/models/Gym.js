const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gymSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true
    }, 
    workouts: [{
        type: Schema.Types.ObjectId,
        ref: 'Workout'
    }],
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

module.exports = mongoose.model('Gym', gymSchema);