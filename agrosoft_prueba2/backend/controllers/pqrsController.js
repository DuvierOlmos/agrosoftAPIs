const Pqrs = require('../models/pqrs');
const TipoPqrs = require('../models/tipoPqrs');
const EstadoPqrs = require('../models/estadoPqrs');

exports.createPqrs = async (req, res) => {
  const { id_tipo_pqrs, id_estado_pqrs, asunto_pqrs, descripcion_pqrs } = req.body;
  try {
    const pqrs = await Pqrs.create({
      id_tipo_pqrs,
      id_estado_pqrs: 1, // Asume que '1' es el ID para el estado 'Recibido'
      asunto_pqrs,
      descripcion_pqrs,
      id_usuario: req.user.id_usuario,
      fecha_envio_pqrs: new Date(),
    });
    res.status(201).json(pqrs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPqrsByUser = async (req, res) => {
  try {
    const pqrsList = await Pqrs.findAll({
      where: { id_usuario: req.user.id_usuario },
      include: [TipoPqrs, EstadoPqrs],
      order: [['fecha_envio_pqrs', 'DESC']],
    });
    res.json(pqrsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};