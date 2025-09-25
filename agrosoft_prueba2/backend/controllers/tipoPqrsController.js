const TipoPqrs = require('../models/tipoPqrs');

exports.createTipoPqrs = async (req, res) => {
  try {
    const tipo = await TipoPqrs.create(req.body);
    res.status(201).json(tipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTipoPqrs = async (req, res) => {
  try {
    const tiposPqrs = await TipoPqrs.findAll();
    res.json(tiposPqrs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tipos de PQRS.' });
  }
};