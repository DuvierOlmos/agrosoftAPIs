// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const User = require('../models/user');

router.get('/admin/:id_usuario', userController.getUserByIdAdmin);
router.post('/admin/create', userController.createUserAdmin);
router.get('/admin', userController.getAllUsersAdmin);
router.put('/admin/update/:id_usuario',  userController.updateUserAdmin);
router.delete('/admin/delete/:id_usuario',  userController.deleteUserAdmin);


// --- Rutas de Autenticación 
// router.post('/register', authController.register); 
// router.post('/login', authController.login);

module.exports = router;