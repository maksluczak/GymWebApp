const Country = require('../models/Country');

const getCitiesInCountry = async (countryId) => {
    const country = await Country.findById(countryId).populate('cities');
    return country?.cities || [];
};

module.exports = {
    getCitiesInCountry
};