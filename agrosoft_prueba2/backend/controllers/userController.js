// controllers/userController.js
const User = require('../models/user');
const Rol = require('../models/rol');
const bcrypt = require('bcryptjs');

// 1. Obtener TODOS los Usuarios con su Rol asociado
exports.getAllUsersAdmin = async (req, res) => {
  try {
    const users = await User.findAll({
      // Incluimos el modelo Rol para ver el tipo de usuario
      include: [{
        model: Rol,
        as: 'Rol',
        attributes: ['nombre_rol'] // Solo necesitamos el nombre del rol
      }],
      attributes: { exclude: ['password_hash'] } // Excluimos el hash de la contraseña por seguridad
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios', details: error.message });
  }
};

exports.getUserByIdAdmin = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const user = await User.findByPk(id_usuario, {
      
      include: [{
        model: Rol,
        as: 'Rol',
        attributes: ['nombre_rol']
      }],
      // Excluir el hash de la contraseña por seguridad
      attributes: { exclude: ['password_hash'] } 
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario', details: error.message });
  }
};

// 2. Crear Nuevo Usuario (Admin puede registrar directamente a otros admins/productores)
exports.createUserAdmin = async (req, res) => {
  try {
    const { nombre_usuario, password, correo_electronico, id_rol=1, documento_identidad, estado='Activo' } = req.body;
    
    // 1. Hashear la contraseña
    const password_hash = await bcrypt.hash(password, 10);
    
    // 2. Verificar que el rol exista
    const rolExistente = await Rol.findByPk(id_rol);
        
        if (!rolExistente) {
            // Si el rol no existe, detenemos la operación y enviamos un error 400
            return res.status(400).json({ message: `El rol con ID ${id_rol} no existe.` });
        }

    const newUser = await User.create({
      nombre_usuario,
      password_hash,
      correo_electronico,
      id_rol,
      documento_identidad,
      estado,
    });
    
    // Devolvemos el usuario sin el hash de la contraseña
    res.status(201).json({ id_usuario: newUser.id_usuario, nombre_usuario: newUser.nombre_usuario, correo_electronico: newUser.correo_electronico });

  } catch (error) {
    // Manejar error de unicidad de correo
    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ message: 'El correo electrónico ya está registrado.' });
    }
    res.status(500).json({ error: 'Error al crear el usuario', details: error.message });
  }
};

// 3. Actualizar Usuario y Cambiar Rol
exports.updateUserAdmin = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const { password, id_rol, ...updateData } = req.body; // Separamos password y id_rol
    
    // Si se proporciona una nueva contraseña, hashearla
    if (password) {
      updateData.password_hash = await bcrypt.hash(password, 10);
    }

    // Si se proporciona un nuevo rol, verificar que exista
    if (id_rol) {
        const rol = await Rol.findByPk(id_rol);
        if (!rol) {
            return res.status(400).json({ message: 'El ID de rol proporcionado no existe.' });
        }
        updateData.id_rol = id_rol;
    }

    const [updated] = await User.update(updateData, {
      where: { id_usuario }
    });
    
    if (updated) {
      const updatedUser = await User.findByPk(id_usuario, { attributes: { exclude: ['password_hash'] } });
      return res.status(200).json(updatedUser);
    }
    
    return res.status(404).json({ message: 'Usuario no encontrado' });

  } catch (error) {
    console.error('Error durante la actualización del usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario', details: error.message });
    
  }
};

// 4. Eliminar Usuario
exports.deleteUserAdmin = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id_usuario: req.params.id_usuario }
    });
    
    if (deleted) {
      
       res.status(204).json({ message: 'Usuario eliminado' });
    }
    
    return res.status(404).json({ message: 'Usuario no encontrado para eliminar' });

  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario', details: error.message });
  }
};
