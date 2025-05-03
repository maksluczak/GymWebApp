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

const updateWorkout = async (req, res) => {
    try {
        const gym = await Gym.findByIdAndUpdate(req.params, req.body, { new: true });
        res.status(201).json(gym);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteWorkout = async (req, res) => {
    try {
        const result = await Gym.findByIdAndDelete(req.params.id);
        await City.findByIdAndUpdate(gym.city, { $pull: { gyms: gym._id }});
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createWorkout,
    updateWorkout,
    deleteWorkout
}