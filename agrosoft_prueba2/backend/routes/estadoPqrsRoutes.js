// routes/estadoPqrsRoutes.js
const express = require('express');
const router = express.Router();
const estadoPqrsController = require('../controllers/estadoPqrsController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/', authMiddleware, adminMiddleware, estadoPqrsController.createEstadoPqrs);
router.get('/', estadoPqrsController.getAllEstadoPqrs);

module.exports = router;