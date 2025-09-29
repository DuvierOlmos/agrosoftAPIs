// routes/estadoPqrsRoutes.js
const express = require('express');
const router = express.Router();
const estadoPqrsController = require('../controllers/estadoPqrsController');
const adminMiddleware = require('../middlewares/adminMiddleware'); 
// Opcionalmente, puedes usar authMiddleware para proteger la lectura, pero aquí asumimos que adminMiddleware ya hace la verificación

// Rutas de ADMINISTRACIÓN (CRUD completo)
router.post('/create',  estadoPqrsController.createEstado); // Crear nuevo estado
router.put('/update/:id',  estadoPqrsController.updateEstado); // Actualizar estado
router.delete('/delete/:id', estadoPqrsController.deleteEstado); // Eliminar estado

// Rutas de LECTURA (Depende de si necesitas que el catálogo sea público o solo para usuarios autenticados)
router.get('/admin', estadoPqrsController.getAllEstados); // Obtener todos
router.get('/:id', estadoPqrsController.getEstadoById); // Obtener por ID

module.exports = router;