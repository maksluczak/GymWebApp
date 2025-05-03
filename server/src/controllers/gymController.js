const Gym = require('../models/Gym');
const City =require('../models/City');
const { getWorkoutsInGym, getProductsInGym } = require('../services/gymService');

const createGym = async (req, res) => {
    try {
        const gym = new Gym(req.body);
        await gym.save();

        await City.findByIdAndUpdate(gym.city, { $push: { gyms: gym._id } });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateGym = async (req, res) => {
    try {
        const gym = await Gym.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(gym);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteGym = async (req, res) => {
    try {
        const result = await Gym.findByIdAndDelete(req.params.id);
        await City.findByIdAndUpdate(result.city, { $pull: { gyms: result._id }});
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllWorkoutsInGym = async (req, res) => {
    try {
        const workouts = await getWorkoutsInGym(req.params.id);
        res.json(workouts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllProductsInGym = async (req, res) => {
    try {
        const products = await getProductsInGym(req.params.id);
        res.json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createGym,
    updateGym,
    deleteGym,
    getAllWorkoutsInGym,
    getAllProductsInGym
}