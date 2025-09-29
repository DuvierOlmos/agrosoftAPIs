// routes/productoDescuentoRoutes.js
const express = require('express');
const router = express.Router();
const pdController = require('../controllers/productoDescuentoController');
const adminMiddleware = require('../middlewares/adminMiddleware'); 

// --- Rutas de Administración para Asignación de Descuentos ---

// POST: Asignar un descuento a un producto
router.post('/admin/assign',  pdController.assignDescuentoToProduct);

// GET: Obtener todos los descuentos de un producto específico
router.get('/admin/:id_producto', pdController.getAsignaciones);

// DELETE: Desasignar un descuento de un producto
// La URL utiliza ambos IDs como parámetros para identificar la asignación
router.delete('/admin/unassign/:id_producto/:id_descuento', pdController.unassignDescuentoFromProduct);

module.exports = router;
