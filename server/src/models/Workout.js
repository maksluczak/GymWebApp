const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    weekday: {
        type: String,
        enum: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
        required: true
    },
    hour: {
        type: String,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/,
        required: true
    },
    max_people: {
        type: Number,
        required: true
    },
    gym: {
        type: Schema.Types.ObjectId,
        ref: 'Gym',
        required: true
    },
    trainer: {
        type: Schema.Types.ObjectId,
        ref: 'Trainer',
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Workout', workoutSchema);