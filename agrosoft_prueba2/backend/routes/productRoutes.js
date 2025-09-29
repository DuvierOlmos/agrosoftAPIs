// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Rutas de Administración (Acceso total para Admin)

// Obtener TODOS los productos (incluye pendientes y rechazados)
router.get('/admin',  productController.getAllProductsAdmin);

router.post('/admin/create',  productController.createProductAdmin);

router.get('/admin/:id',  productController.getProductById);

// Actualizar cualquier campo (incluye edición completa)
router.put('/admin/update/:id',  productController.updateProductAdmin);

// Ruta específica para la aprobación/rechazo
router.patch('/admin/approve/:id',  productController.approveProduct);

// Eliminar permanentemente
router.delete('/admin/delete/:id',  productController.deleteProductAdmin);


// (Nota: Las rutas para que el productor suba sus propios productos irán en otra sección)

module.exports = router;