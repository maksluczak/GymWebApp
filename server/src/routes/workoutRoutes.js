const express = require('express');
const workoutController = require('../controllers/workoutController');

const router = express.Router();

router.post('/:id/signup', workoutController.handleNewUserOnWorkout);
router.post('/', workoutController.createWorkout);
router.put('/:id', workoutController.updateWorkout);
router.delete('/:id', workoutController.deleteWorkout);

module.exports = router;