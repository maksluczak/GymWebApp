const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainerSchema = new Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        require: true
    },
    specialization: {
        type: String
    }
});

module.exports = mongoose.model('Trainer', trainerSchema);