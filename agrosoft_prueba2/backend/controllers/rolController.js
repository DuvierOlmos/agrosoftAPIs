
const Rol = require('../models/rol');

exports.createRol = async (req, res) => {
  try {
    const rol = await Rol.create(req.body);
    res.status(201).json(rol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRol = async (req, res) => {
  try {
    const [updated] = await Rol.update(req.body, {
      where: { id_rol: req.params.id_rol }
    });
    
    if (updated) {
      // Si se actualizó, recuperamos el rol actualizado para devolverlo
      const updatedRol = await Rol.findByPk(req.params.id);
      return res.status(200).json(updatedRol);
    }
    
    return res.status(404).json({ message: 'Rol no encontrado para actualizar' });

  } catch (error) {
    
    // Manejar posibles errores de validación o duplicidad
    res.status(500).json({ error: 'Error al actualizar el rol', details: error.message });
  }
};

// 4. Eliminar Rol (Admin - Usar con cautela, no debe eliminar roles asignados)
exports.deleteRol = async (req, res) => {
    try {
        const deleted = await Rol.destroy({
            where: { id_rol: req.params.id_rol }
        });
        if (deleted) {
            return res.status(204).json({ message: 'Rol eliminado' });
        }
        return res.status(404).json({ message: 'Rol no encontrado para eliminar' });
    } catch (error) {
        // El error puede ser debido a restricción de clave foránea
        res.status(500).json({ error: 'Error al eliminar el rol', details: error.message });
    }
};

// 5. Obtener Rol por ID (Admin)
exports.getRolById = async (req, res) => {
  try {
    const { id_rol } = req.params;

    const rol = await Rol.findByPk(id_rol);

    if (!rol) {
      return res.status(404).json({ error:'Rol no encontrado' });
    }

    res.json(rol);

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el rol', details: error.message });
  }
};