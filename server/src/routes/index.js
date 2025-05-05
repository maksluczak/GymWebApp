const cityRoutes = require('./cityRoutes');
const countryRoutes = require('./countryRoutes');

const express = require('express');
const router = express.Router();

router.use('/city', cityRoutes);
router.use('/country', countryRoutes);

module.exports = router;