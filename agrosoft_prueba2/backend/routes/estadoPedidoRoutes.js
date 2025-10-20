
const express = require('express');
const router = express.Router();
const estadoPedidoController = require('../controllers/estadoPedidoController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');


router.post('/admin/create',  estadoPedidoController.createEstadoPedido);
router.get('/admin', estadoPedidoController.getAllEstadoPedidos);

module.exports = router;