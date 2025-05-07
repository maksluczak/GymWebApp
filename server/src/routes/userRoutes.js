const express = require('express');
const userRoutes = require('../controllers/userController');

const router = express.Router();

router.get('/', userRoutes.getAllUsers);
router.get('/:id', userRoutes.getUserById);
router.post('/', userRoutes.createUser);
router.put('/:id', userRoutes.updateUser);
router.delete('/:id', userRoutes.deleteUser);

module.exports = router;