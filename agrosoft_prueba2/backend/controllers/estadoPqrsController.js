const EstadoPqrs = require('../models/estadoPqrs');

exports.createEstadoPqrs = async (req, res) => {
  try {
    const estado = await EstadoPqrs.create(req.body);
    res.status(201).json(estado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los estados de PQRS
exports.getAllEstadoPqrs = async (req, res) => {
  try {
    const estadosPqrs = await EstadoPqrs.findAll();
    res.json(estadosPqrs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los estados de PQRS.' });
  }
};