const Trainer = require('../models/Trainer');
const Workout = require('../models/Workout');

const getAllTrainierWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ trainer: req.params.id });
        res.json(workouts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const createTrainier = async (req, res) => {
    try {
        const result = await Trainer.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            specialization: req.body.specialization
        });
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateTrainier = async (req, res) => {
    try {
        const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(trainer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteTrainier = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id);
        if (!trainer) {
            return res.status(404).json({ message: 'No trainer found with this ID.' });
        }
        const result = await Trainer.deleteOne({ _id: trainer._id });
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getAllTrainierWorkouts,
    createTrainier,
    updateTrainier,
    deleteTrainier,
};
