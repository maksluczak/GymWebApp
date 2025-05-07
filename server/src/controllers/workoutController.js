const Workout = require('../models/Workout');
const Gym = require('../models/Gym');
const User = require('../models/User');
const { getPeopleInTraining } = require('../services/workoutService');

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
        const gym = await Gym.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

const handleNewUserOnWorkout = async (req, res) => {
    try {
        const { email, workoutId } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User does not exist." });
        }

        const workout = await Workout.findById(workoutId);
        if (!workout) {
            return res.status(404).json({ message: "Workout not found." });
        }   
        
        const peopleOnWorkout = await getPeopleInTraining(workoutId);
        if (peopleOnWorkout >= workout.max_people) {
            return res.status(400).json({ message: "No more free seats in workout." });
        }

        if (workout.users.includes(user._id)) {
            return res.status(400).json({ message: "User already signed up for the training." });
        }

        await Workout.findByIdAndUpdate(workoutId, { $push: { users: user._id }});
        await User.findByIdAndUpdate(user._id, { $push: { workouts: workoutId }});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createWorkout,
    updateWorkout,
    deleteWorkout,
    handleNewUserOnWorkout
}