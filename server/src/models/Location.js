const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    country: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require:true
    },
    address: {
        type: String,
        require:true
    }
});

module.exports = mongoose.model('Location', locationSchema);