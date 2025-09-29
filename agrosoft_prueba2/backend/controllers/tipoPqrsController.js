// controllers/tipoPqrsController.js
const TipoPqrs = require('../models/tipoPqrs');

// 1. Crear Nuevo Tipo (Solo Admin)
// controllers/tipoPqrsController.js (Función mejorada)

// controllers/tipoPqrsController.js (Función mejorada)

exports.createTipo = async (req, res) => {
  try {
    const { nombre_tipo } = req.body;

    // Validación explícita de campos obligatorios
    if (!nombre_tipo || typeof nombre_tipo !== 'string' || nombre_tipo.trim() === '') {
      return res.status(400).json({ 
        message: 'El campo "nombre_tipo" es obligatorio y no puede estar vacío.' 
      });
    }

    const newTipo = await TipoPqrs.create(req.body);
    res.status(201).json(newTipo);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Este nombre de tipo de PQRS ya existe.' });
    }
    // Para otros errores de DB
    res.status(500).json({ error: 'Error al crear el tipo de PQRS', details: error.message });
  }
};

// 2. Obtener Todos los Tipos (Público/Admin - Necesario para formularios)
exports.getAllTipos = async (req, res) => {
  try {
    const tipos = await TipoPqrs.findAll({
      order: [['id_tipo_pqrs', 'ASC']]
    });
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tipos de PQRS', details: error.message });
  }
};

// 3. Obtener Tipo por ID (Público/Admin)
exports.getTipoById = async (req, res) => {
  try {
    const tipo = await TipoPqrs.findByPk(req.params.id_tipo_pqrs);
    if (!tipo) {
      return res.status(404).json({ message: 'Tipo de PQRS no encontrado' });
    }
    res.json(tipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el tipo', details: error.message });
  }
};

// 4. Actualizar Tipo (Solo Admin)
exports.updateTipo = async (req, res) => {
  try {
    const [updated] = await TipoPqrs.update(req.body, {
      where: { id_tipo_pqrs: req.params.id }
    });
    if (updated) {
      const updatedTipo = await TipoPqrs.findByPk(req.params.id);
      return res.status(200).json(updatedTipo);
    }
    return res.status(404).json({ message: 'Tipo de PQRS no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el tipo', details: error.message });
  }
};

// 5. Eliminar Tipo (Solo Admin)
exports.deleteTipo = async (req, res) => {
  try {
    const deleted = await TipoPqrs.destroy({
      where: { id_tipo_pqrs: req.params.id }
    });
    if (deleted) {
      return res.status(204).json({ message: 'Tipo de PQRS eliminado' });
    }
    return res.status(404).json({ message: 'Tipo de PQRS no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el tipo', details: error.message });
  }
};