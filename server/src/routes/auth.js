const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.handleLogin);
router.post('/register', authController.handleLogin);

module.exports = router;