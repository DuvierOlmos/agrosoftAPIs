// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/checkout', authMiddleware, orderController.checkout);
router.get('/', authMiddleware, orderController.getOrderHistory);

module.exports = router;