// routes/tipoPqrsRoutes.js
const express = require('express');
const router = express.Router();
const tipoPqrsController = require('../controllers/tipoPqrsController');
const adminMiddleware = require('../middlewares/adminMiddleware'); 
// Se asume que el archivo principal de rutas lo importará y usará bajo /api/pqrs/tipos

// Rutas de LECTURA (Públicas o autenticadas, dependiendo del diseño)
router.get('/admin', tipoPqrsController.getAllTipos); 
router.get('/admin/:id_tipo_pqrs', tipoPqrsController.getTipoById); 

// Rutas de ADMINISTRACIÓN (CRUD completo)
router.post('/admin/create', tipoPqrsController.createTipo);
router.put('/admin/update/:id',  tipoPqrsController.updateTipo);
router.delete('/admin/delete/:id',  tipoPqrsController.deleteTipo);

module.exports = router;