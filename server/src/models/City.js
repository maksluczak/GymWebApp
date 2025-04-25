const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    city: {
        type: String,
        required: true
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    }, 
    gyms: [{
        type: Schema.Types.ObjectId,
        ref: "Gym"
    }]
});

module.exports = mongoose.model('City', citySchema);