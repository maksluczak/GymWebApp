const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gymSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required:true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    }
});

module.exports = mongoose.model('Gym', gymSchema);