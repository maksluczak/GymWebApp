const cityRoutes = require('./cityRoutes');
const countryRoutes = require('./countryRoutes');
const gymRoutes = require('./gymRoutes');
const trainierRoutes = require('./trainierRoutes');
const userRoutes = require('./userRoutes');
const workoutRoutes = require('./workoutRoutes');
const productRoutes = require('./productRoutes');

const express = require('express');
const router = express.Router();

router.use('/city', cityRoutes);
router.use('/country', countryRoutes);
router.use('/gym', gymRoutes);
router.use('/trainier', trainierRoutes);
router.use('/user', userRoutes);
router.use('/workout', workoutRoutes);
router.use('/product', productRoutes);

module.exports = router;