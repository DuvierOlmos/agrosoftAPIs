// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const adminMiddleware = require('../middlewares/adminMiddleware');


router.get('/admin',  productController.getAllProductsAdmin);
router.post('/admin/create',  productController.createProductAdmin);
router.get('/admin/:id',  productController.getProductById);
router.put('/admin/update/:id',  productController.updateProductAdmin);
router.patch('/admin/approve/:id',  productController.approveProduct);
router.delete('/admin/delete/:id',  productController.deleteProductAdmin);


module.exports = router;