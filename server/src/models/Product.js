const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    gym: {
        type: Schema.Types.ObjectId,
        ref: 'Gym',
        require: true
    }
});

module.exports = mongoose.model('Product', productSchema);