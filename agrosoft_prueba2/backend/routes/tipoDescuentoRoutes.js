// routes/tipoDescuentoRoutes.js
const express = require('express');
const router = express.Router();
const tipoDescuentoController = require('../controllers/tipoDescuentoController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Ruta para crear un nuevo tipo de descuento (solo para administradores)
router.post('/create', tipoDescuentoController.createTipoDescuento);

// Ruta para obtener todos los tipos de descuento (acceso público)
router.get('/ver', tipoDescuentoController.getAllTipoDescuentos);

module.exports = router;