// controllers/tipoDescuentoController.js

const TipoDescuento = require('../models/tipoDescuento');

// Crear un nuevo tipo de descuento (solo para administradores)
exports.createTipoDescuento = async (req, res) => {
  try {
    const tipo = await TipoDescuento.create(req.body);
    res.status(201).json(tipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el tipo de descuento.', details: error.message });
  }
};

// Obtener todos los tipos de descuento (acceso público)
exports.getAllTipoDescuentos = async (req, res) => {
  try {
    const tipos = await TipoDescuento.findAll();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tipos de descuento.', details: error.message });
  }
};