// routes/tipoDescuentoRoutes.js
const express = require('express');
const router = express.Router();
const tipoDescuentoController = require('../controllers/tipoDescuentoController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');


router.post('/create', tipoDescuentoController.createTipoDescuento);
router.get('/ver', tipoDescuentoController.getAllTipoDescuentos);

module.exports = router;