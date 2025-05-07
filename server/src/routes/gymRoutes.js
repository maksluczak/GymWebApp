const express = require('express');
const gymController = require('../controllers/gymController');

const router = express.Router();

router.get("/:id/workouts", gymController.getAllWorkoutsInGym);
router.get("/:id/products", gymController.getAllProductsInGym);
router.post("/", gymController.createGym);
router.put("/:id", gymController.updateGym);
router.delete("/:id", gymController.deleteGym);

module.exports = router;