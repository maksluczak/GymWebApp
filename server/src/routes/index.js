const cityRoutes = require('./cityRoutes');
const countryRoutes = require('./countryRoutes');
const gymRoutes = require('./gymRoutes');
const trainierRoutes = require('./trainierRoutes');

const express = require('express');
const router = express.Router();

router.use('/city', cityRoutes);
router.use('/country', countryRoutes);
router.use('/gym', gymRoutes);
router.use('/trainier', trainierRoutes);

module.exports = router;