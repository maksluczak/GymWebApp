const express = require("express");
const cityController = require('../controllers/cityController');

const router = express.Router();

router.get("/:id/gyms", cityController.getAllGymsInCity);
router.post("/", cityController.createCity);
router.put("/:id", cityController.updateCity);
router.delete("/:id", cityController.deleteCity);

module.exports = router;