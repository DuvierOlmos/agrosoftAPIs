// routes/categoriaRoutes.js
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const adminMiddleware = require('../middlewares/adminMiddleware'); 

// Rutas de ADMINISTRACIÓN (CRUD) de Categorías
router.post('/admin/create',  categoriaController.createCategoria); // Crear Categoria
router.put('/admin/update/:id', categoriaController.updateCategoria);
router.delete('/admin/delete/:id', categoriaController.deleteCategory);
// Actualizar Categoria
// (Se pueden añadir DELETE Categoria/SubCategoria)

// Rutas para gestionar SubCategorías
router.post('/admin/crearSubcategoria',categoriaController.createSubCategoria); // Crear SubCategoria

// Rutas de LECTURA (pueden ser públicas o protegidas según tu necesidad)
router.get('/admin', categoriaController.getAllCategoriasWithSub); // Obtener todas las categorías con subcategorías
router.get('/admin/:id_categoria', categoriaController.getCategoryById);
module.exports = router;