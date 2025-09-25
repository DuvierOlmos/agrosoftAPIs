// routes/descuentoRoutes.js
const express = require('express');
const router = express.Router();
const descuentoController = require('../controllers/descuentoController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/', authMiddleware, adminMiddleware, descuentoController.createDescuento);
router.get('/', descuentoController.getAllDescuentos);

module.exports = router;