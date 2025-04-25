const Gym = require('../models/Gym');

const getGymsInCity = async (cityId) => {
    const gyms = await Gym.find({ city: cityId });
    return gyms;
};

module.exports = {
    getGymsInCity
};