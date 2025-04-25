const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gymSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        require: true
    }
});

module.exports = mongoose.model('Gym', gymSchema);