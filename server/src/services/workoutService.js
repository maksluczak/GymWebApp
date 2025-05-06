const Workout = require('../models/Workout');

const getMaxPeopleInTraining = async (workoutId) => {
    const workout = await Workout.findById(workoutId);
    return workout.max_people;
};

module.exports = {
    getMaxPeopleInTraining
}