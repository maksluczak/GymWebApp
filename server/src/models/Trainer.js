const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainerSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    specialization: {
        type: String
    },
    workouts: [{
        type: Schema.Types.ObjectId,
        ref: 'Workout'
    }]
});

module.exports = mongoose.model('Trainer', trainerSchema);