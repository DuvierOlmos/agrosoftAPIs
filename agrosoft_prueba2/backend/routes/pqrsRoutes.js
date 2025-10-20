// routes/pqrsRoutes.js
const express = require('express');
const router = express.Router();
const pqrsController = require('../controllers/pqrsController');
const authMiddleware = require('../middlewares/authMiddleware'); // Necesario para obtener req.user
const adminMiddleware = require('../middlewares/adminMiddleware'); 


router.post('/admin/create', pqrsController.createPqrs); 
router.get('/admin',  pqrsController.getAllPqrsAdmin); 
router.get('/admin/:id_pqrs',  pqrsController.getPqrsById); 
router.put('/admin/update/:id_pqrs', pqrsController.updatePqrsAdmin); 

module.exports = router;