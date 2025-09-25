// routes/tipoPqrsRoutes.js
const express = require('express');
const router = express.Router();
const tipoPqrsController = require('../controllers/tipoPqrsController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/', authMiddleware, adminMiddleware, tipoPqrsController.createTipoPqrs);
router.get('/', tipoPqrsController.getAllTipoPqrs);


module.exports = router;