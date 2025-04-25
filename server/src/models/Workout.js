const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    weekday: {
        type: String,
        enum: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
        require: true
    },
    hour: {
        type: String,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/,
        require: true
    },
    gym: {
        type: Schema.Types.ObjectId,
        ref: 'Gym',
        require: true
    },
    trainer: {
        type: Schema.Types.ObjectId,
        ref: 'Trainer',
        require: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Workout', workoutSchema);