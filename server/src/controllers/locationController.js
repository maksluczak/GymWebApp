const Location = require('../models/Location');

const getAllLocations = async (req, res) => {
    const locations = await Location.find();
    if (!locations) return res.status(200).json({ message: 'no location found' });
    return res.json(locations);
};

const getLocationByCountry = async (req, res) => {
    try {
        const { country } = req.params;
        if (!country) {
            return res.status(400).json({ message: 'country is required' });
        }
        const locations = await Location.find({ country }).exec();
        if (!locations.length) {
            return res.status(404).json({ message: 'no locations found for this country' });
        }
        return res.json(locations);
    } catch (err) {
        return res.status(404).json({ error: err.message });
    }
};

const getLocationByCity = async (req, res) => {
    try {
        const { city } = req.params;
        if (!city) {
            return res.status(400).json({ message: 'city is required' });
        }
        const locations = await Location.find({ city }).exec();
        if(!locations.length) {
            return res.status(404).json({ message: 'no locations found for this city' });
        }
        return res.json(locations);
    } catch (err) {
        return res.status(404).json({ error: err.message });
    }
};

const createLocation = async (req, res) => {
    if(!req?.body?.country || !req?.body?.city) return res.status(400).json({ message: 'country and city are required' });
    try {
        const result = await Location.create( {
            country: req.body.country,
            city: req.body.city
        });
        res.status(201).json(result);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const updateLocation = async (req, res) => {
    try {
        if (!req?.body?.id) {
            return res.status(400).json({ 'message': 'ID is required' });
        }
        const location = await Location.findOne({ _id: req.body.id }).exec();
        if (!location) {
            return res.status(204).json({ message: 'no matches id' });
        }
        if (req.body.country) location.country = req.body.country;
        if (req.body.city) location.city = req.body.city;
        const result = await location.save();
        res.json(result);
    } catch (err) {
        return res.status(404).json({ error: err.message });
    }
};

const deleteLocation = async (req, res) => {
    try {
        if (!req?.body?.id) {
            return res.status(400).json({ 'message': 'ID is required' });
        }
        const location = await Location.findOne({ _id: req.body.id }).exec();
        if (!location) {
            return res.status(204).json({ message: 'no matches id' });
        }
        const result = await location.deleteOne();
        res.json(result);
    } catch (err) {
        return res.status(404).json({ error: err.message });
    }
};

module.exports = {
    getAllLocations,
    getLocationByCountry,
    getLocationByCity,
    createLocation,
    updateLocation,
    deleteLocation
}