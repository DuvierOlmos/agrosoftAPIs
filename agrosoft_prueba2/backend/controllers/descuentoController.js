const Descuento = require('../models/descuento');
const User = require('../models/user');

exports.createDescuento = async (req, res) => {
  const { nombre_descuento, codigo_descuento, valor_descuento, fecha_inicio_descuento, fecha_fin_descuento } = req.body;
  try {
    const descuento = await Descuento.create({
      nombre_descuento,
      codigo_descuento,
      valor_descuento,
      fecha_inicio_descuento,
      fecha_fin_descuento,
      id_usuario: req.user.id_usuario, // Asocia el descuento al usuario creador
    });
    res.status(201).json(descuento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllDescuentos = async (req, res) => {
  try {
    const descuentos = await Descuento.findAll({
      include: [User],
    });
    res.json(descuentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};