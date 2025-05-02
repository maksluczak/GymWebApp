const Gym = require('../models/Gym');
const City =require('../models/City');
const { getWorkoutsInGym, getProductsInGym } = require('../services/gymService');

const createGym = async (req, res) => {
    try {
        const gym = new Gym(req.body);
        await gym.save();

        await Gym.findByIdAndUpdate(gym.city, { $push: { gyms: gym._id } });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateGym = async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteGym = async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllWorkoutsInGym = async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllProductsInGym = async (req, res) => {
    try {

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