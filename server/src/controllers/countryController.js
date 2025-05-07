const Country = require('../models/Country');
const { getCitiesInCountry } = require('../services/countryService');
const mongoose = require('mongoose');

const getAllCountries = async (req, res) => {
    try {
        const countries = await Country.find().exec();
        if (countries.length === 0) {
            return res.status(404).json({ message: 'No countries found' });
        }
        return res.json(countries);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
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
    if (!req?.body?.country) {
        return res.status(400).json({ message: 'Country is required' });
    }
    try {
        const result = await Country.create({ country: req.body.country });
        res.status(201).json(result);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const updateCountry = async (req, res) => {
    try {
        const id = req.params.id;
        const country = await Country.findById(id).exec();
        if (!country) {
            return res.status(404).json({ message: 'Country not found' });
        }
        if (req.body.country) country.country = req.body.country;
        const result = await country.save();
        res.json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const deleteCountry = async (req, res) => {
    try {
        const id = req.params.id;
        const country = await Country.findById(id).exec();
        if (!country) {
            return res.status(404).json({ message: 'Country not found' });
        }
        const result = await Country.deleteOne({ _id: id });
        res.json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllCountries,
    getAllCitiesInCountry,
    createCountry,
    updateCountry,
    deleteCountry
};