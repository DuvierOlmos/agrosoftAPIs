// routes/estadoPedidoRoutes.js
const express = require('express');
const router = express.Router();
const estadoPedidoController = require('../controllers/estadoPedidoController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/', authMiddleware, adminMiddleware, estadoPedidoController.createEstadoPedido);
router.get('/', estadoPedidoController.getAllEstadoPedidos);

module.exports = router;