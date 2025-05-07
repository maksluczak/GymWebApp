const City = require('../models/City');
const Country = require('../models/Country');
const { getGymsInCity } = require('../services/cityService');

const createCity = async (req, res) => {
    try {
        const { city, country } = req.body;
        if (!city || !country) {
            return res.status(400).json({ message: 'City name and country are required' });
        }
        const newCity = new City(req.body);
        await newCity.save();

        await Country.findByIdAndUpdate(newCity.country, { $push: { cities: newCity._id }});
        return res.status(200).json(newCity);
    } catch (err) {
        return res.status(404).json({ error: err.message });
    }
};

const updateCity = async (req, res) => {
    try {
        const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(city);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const deleteCity = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        if (!city) return res.status(404).json({ message: 'City not found' });

        await City.findByIdAndDelete(city._id);
        await Country.findByIdAndUpdate(city.country, { $pull: { cities: city._id }});
        return res.status(200).json({ message: 'City deleted' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const getAllGymsInCity = async (req, res) => {
    try {
        const gyms = await getGymsInCity(req.params.id);
        return res.json(gyms);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCity,
    updateCity,
    deleteCity,
    getAllGymsInCity
}