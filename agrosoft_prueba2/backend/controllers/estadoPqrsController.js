// controllers/estadoPqrsController.js
const EstadoPqrs = require('../models/estadoPqrs');

// 1. Crear Nuevo Estado (Solo Admin)
exports.createEstado = async (req, res) => {
  try {
    const newEstado = await EstadoPqrs.create(req.body);
    res.status(201).json(newEstado);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Este nombre de estado ya existe.' });
    }
    res.status(500).json({ error: 'Error al crear el estado de PQRS', details: error.message });
  }
};

// 2. Obtener Todos los Estados (Público/Admin)
exports.getAllEstados = async (req, res) => {
  try {
    const estados = await EstadoPqrs.findAll({
      order: [['id_estado_pqrs', 'ASC']]
    });
    res.json(estados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los estados de PQRS', details: error.message });
  }
};

// 3. Obtener Estado por ID (Público/Admin)
exports.getEstadoById = async (req, res) => {
  try {
    const estado = await EstadoPqrs.findByPk(req.params.id);
    if (!estado) {
      return res.status(404).json({ message: 'Estado de PQRS no encontrado' });
    }
    res.json(estado);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el estado', details: error.message });
  }
};

// 4. Actualizar Estado (Solo Admin)
exports.updateEstado = async (req, res) => {
  try {
    const [updated] = await EstadoPqrs.update(req.body, {
      where: { id_estado_pqrs: req.params.id }
    });
    if (updated) {
      const updatedEstado = await EstadoPqrs.findByPk(req.params.id);
      return res.status(200).json(updatedEstado);
    }
    return res.status(404).json({ message: 'Estado de PQRS no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado', details: error.message });
  }
};

// 5. Eliminar Estado (Solo Admin)
exports.deleteEstado = async (req, res) => {
  try {
    const deleted = await EstadoPqrs.destroy({
      where: { id_estado_pqrs: req.params.id }
    });
    if (deleted) {
      return res.status(204).json({ message: 'Estado de PQRS eliminado' });
    }
    return res.status(404).json({ message: 'Estado de PQRS no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el estado', details: error.message });
  }
};