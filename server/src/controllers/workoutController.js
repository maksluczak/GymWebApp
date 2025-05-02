const Workout = require('../models/Workout');
const Gym = require('../models/Gym');
const { getWorkoutsInGym } = require('../services/gymService');

const createWorkout = async (req, res) => {
    try {
        const workout = new Workout(req.body);
        await workout.save();

        await Gym.findByIdAndUpdate(workout.gym, { $push: { workouts: workout._id }});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createWorkout,

}