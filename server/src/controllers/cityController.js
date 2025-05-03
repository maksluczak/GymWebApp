const City = require('../models/User');
const Country = require('../models/Country');
const { getGymsInCity } = require('../services/cityService');

const createCity = async (req, res) => {
    try {
        const city = new City(req.body);
        await city.save();

        await City.findByIdAndUpdate(city.country, { $push: { cities: city._id }});
        res.status(201).json(city);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const updateCity = async (req, res) => {
    try {
        const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(city);
    } catch (err) {
        return res.status(201).json({ error: err.message });
    }
};

const deleteCity = async (req, res) => {
    try {
        const result = await City.findByIdAndDelete(req.params.id);
        await Country.findByIdAndUpdate(city.country, { $pull: { cities: city._id }});
        res.status(201).json(result);
    } catch (err) {
        return res.status(201).json({ error: err.message });
    }
};

const getAllGymsInCity = async (req, res) => {
    try {
        const gyms = await getGymsInCity(req.params.id);
        res.json(gyms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCity,
    updateCity,
    deleteCity,
    getAllGymsInCity
}