const Gym = require('../models/Gym');
const City =require('../models/City');
const { getWorkoutsInGym, getProductsInGym } = require('../services/gymService');

const createGym = async (req, res) => {
    try {
        const gym = new Gym(req.body);
        await gym.save();

        await City.findByIdAndUpdate(gym.city, { $push: { gyms: gym._id } });
        return res.status(201).json(gym);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const updateGym = async (req, res) => {
    try {
        const gym = await Gym.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(201).json(gym);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const deleteGym = async (req, res) => {
    try {
        const gym = await Gym.findById(req.params.id);
        if (!gym) return res.status(404).json({ message: 'Gym not found' });

        await Gym.findByIdAndDelete(req.params.id);
        await City.findByIdAndUpdate(gym.city, { $pull: { gyms: gym._id }});
        return res.status(200).json({ message: 'Gym deleted' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const getAllWorkoutsInGym = async (req, res) => {
    try {
        const workouts = await getWorkoutsInGym(req.params.id);
        return res.json(workouts);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const getAllProductsInGym = async (req, res) => {
    try {
        const products = await getProductsInGym(req.params.id);
        return res.json(products);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createGym,
    updateGym,
    deleteGym,
    getAllWorkoutsInGym,
    getAllProductsInGym
}