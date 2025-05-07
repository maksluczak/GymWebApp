const express = require('express');
const trainierController = require('../controllers/trainierController');

const router = express.Router();

router.get('/', trainierController.getAllTrainierWorkouts);
router.post('/', trainierController.createTrainier);
router.put('/', trainierController.updateTrainier);
router.delete('/', trainierController.deleteTrainier);

module.exports = router;