// routes/pedidoRoutes.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const adminMiddleware = require('../middlewares/adminMiddleware'); 
const estadoPedidoController = require('../controllers/estadoPedidoController')

// Rutas de ADMINISTRACIÓN de Pedidos (CRUD solo lectura/actualización de estado)
router.get('/admin', pedidoController.getAllPedidosAdmin); // Leer todos
router.get('/admin/:id',  pedidoController.getPedidoByIdAdmin); // Leer uno
router.put('/admin/orders/estado/:id', estadoPedidoController.updateEstadoPedido);
router.put('/admin/estadoPedido/:id', estadoPedidoController.updateEstadoPedido);  // Actualizar estado

module.exports = router;