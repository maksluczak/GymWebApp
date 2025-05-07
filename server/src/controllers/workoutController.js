const Workout = require('../models/Workout');
const Gym = require('../models/Gym');
const User = require('../models/User');
const { getPeopleInTraining } = require('../services/workoutService');

const createWorkout = async (req, res) => {
    try {
        const workout = new Workout(req.body);
        await workout.save();

        await Gym.findByIdAndUpdate(workout.gym, { $push: { workouts: workout._id }});
        return res.status(201).json(workout);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const updateWorkout = async (req, res) => {
    try {
        const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!workout) return res.status(404).json({ message: 'Workout not found' });
        return res.status(200).json(workout);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) return res.status(404).json({ message: 'Workout not found' });

        await Workout.findByIdAndDelete(req.params.id);
        await Gym.findByIdAndUpdate(workout.gym, { $pull: { workouts: workout._id }});
        return res.status(200).json({ message: 'Workout deleted' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const handleNewUserOnWorkout = async (req, res) => {
    try {
        const { email, workoutId } = req.body;
        if (!email || !workoutId) {
            return res.status(400).json({ message: 'Email and workoutId are required.' });
        }

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
        return res.status(200).json({ message: 'User successfully signed up for workout.' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createWorkout,
    updateWorkout,
    deleteWorkout,
    handleNewUserOnWorkout
}