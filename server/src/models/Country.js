const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    country: {
        type: String,
        required: true
    },
    cities: [{
        type: Schema.Types.ObjectId,
        ref: 'City'
    }]
});

module.exports = mongoose.model('Country', countrySchema);