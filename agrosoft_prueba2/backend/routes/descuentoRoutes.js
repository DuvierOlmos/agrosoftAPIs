// routes/descuentoRoutes.js
const express = require('express');
const router = express.Router();
const descuentoController = require('../controllers/descuentoController');
const adminMiddleware = require('../middlewares/adminMiddleware'); // Debe estar creado

// Rutas de administración de Descuentos (solo para Admin)
router.post('/create',  descuentoController.createDescuento);
router.get('/admin',  descuentoController.getAllDescuentos);
router.get('/:id',  descuentoController.getDescuentoById);
router.put('/update/:id',  descuentoController.updateDescuento);
router.delete('/delete/:id',  descuentoController.deleteDescuento);

module.exports = router;