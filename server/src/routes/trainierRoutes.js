const express = require('express');
const trainierController = require('../controllers/trainierController');

const router = express.Router();

router.get('/:id', trainierController.getTrainerById);
router.get('/:id/workouts', trainierController.getAllTrainierWorkouts);
router.post('/', trainierController.createTrainier);
router.put('/:id', trainierController.updateTrainier);
router.delete('/:id', trainierController.deleteTrainier);

module.exports = router;