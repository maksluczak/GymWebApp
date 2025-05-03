const Workout = require('../models/Workout');
const Product = require('../models/Product');

const getWorkoutsInGym = async (gymId) => {
    const workouts = await Workout.find({ gym: gymId });
    return workouts;
};

const getProductsInGym = async (gymId) => {
    const products = await Product.find({ gym: gymId });
    return products;
}

module.exports = {
    getWorkoutsInGym,
    getProductsInGym
};