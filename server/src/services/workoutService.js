const Workout = require('../models/Workout');

const getPeopleInTraining = async (workoutId) => {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
        throw new Error('Workout not found');
    }
    return workout.users.length;
};

module.exports = {
    getPeopleInTraining
}