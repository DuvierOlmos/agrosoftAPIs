// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

router.get('/', userController.getAllUsers);

module.exports = router;