// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const User = require('../models/user');
// Importar el controlador de autenticación si tienes rutas de login/registro públicas

// --- Rutas de Administración de Usuarios (CRUD total) ---

router.get('/admin/:id_usuario', userController.getUserByIdAdmin);

// Crear un nuevo usuario (útil para que el admin registre directamente)
router.post('/admin/create', userController.createUserAdmin);

// Obtener todos los usuarios del sistema
router.get('/admin', userController.getAllUsersAdmin);

// Actualizar usuario (incluyendo cambio de rol y estado)
router.put('/admin/update/:id_usuario',  userController.updateUserAdmin);

// Eliminar usuario
router.delete('/admin/delete/:id_usuario',  userController.deleteUserAdmin);


// --- Rutas de Autenticación Públicas 
// router.post('/register', authController.register); 
// router.post('/login', authController.login);

module.exports = router;