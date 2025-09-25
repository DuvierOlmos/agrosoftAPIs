// routes/pqrsRoutes.js
const express = require('express');
const router = express.Router();
const pqrsController = require('../controllers/pqrsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, pqrsController.createPqrs);
router.get('/', authMiddleware, pqrsController.getPqrsByUser);

module.exports = router;