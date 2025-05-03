const Country = require('../models/Country');
const { getCitiesInCountry } = require('../services/countryService');

const getAllCountries = async (req, res) => {
    const countries = await Country.find();
    if (!countries) return res.status(200).json({ message: 'no country found' });
    return res.json(countries);
};

const getAllCitiesInCountry = async (req, res) => {
    try {
        const cities = await getCitiesInCountry(req.params.id);
        res.json(cities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCountry = async (req, res) => {
    if(!req?.body?.country) return res.status(400).json({ message: 'country is required' });
    try {
        const result = await Country.create( {
            country: req.body.country
        });
        res.status(201).json(result);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const updateCountry = async (req, res) => {
    try {
        if (!req?.body?.id) {
            return res.status(400).json({ message: 'ID is required' });
        }
        const country = await Country.findOne({ _id: req.body.id }).exec();
        if (!country) {
            return res.status(204).json({ message: 'no matches id' });
        }
        if (req.body.country) country.country = req.body.country;
        const result = await Country.save();
        res.json(result);
    } catch (err) {
        return res.status(404).json({ error: err.message });
    }
};

const deleteCountry = async (req, res) => {
    try {
        if (!req?.body?.id) {
            return res.status(400).json({ message: 'ID is required' });
        }
        const country = await Country.findOne({ _id: req.body.id }).exec();
        if (!country) {
            return res.status(204).json({ message: 'no matches id' });
        }
        const result = await Country.deleteOne();
        res.json(result);
    } catch (err) {
        return res.status(404).json({ error: err.message });
    }
};

module.exports = {
    getAllCountries,
    getAllCitiesInCountry,
    createCountry,
    updateCountry,
    deleteCountry
}