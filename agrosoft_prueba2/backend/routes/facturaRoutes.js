// routes/facturaRoutes.js
const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:orderId', authMiddleware, facturaController.getFacturaByOrderId);

module.exports = router;