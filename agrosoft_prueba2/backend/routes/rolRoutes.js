// routes/rolRoutes.js
const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Ruta para crear un nuevo rol (solo para administradores)
router.post('/', authMiddleware, adminMiddleware, rolController.createRol);

// Ruta para obtener todos los roles (acceso público)
router.get('/', rolController.getAllRoles);

module.exports = router;