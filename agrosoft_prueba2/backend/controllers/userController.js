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
// Asegúrate de que tienes importados 'bcrypt' y tus modelos 'User' y 'Rol'

exports.createUserAdmin = async (req, res) => {
    // Desestructuración
    const { 
        nombre_usuario, 
        password_hash, 
        correo_electronico, 
        id_rol, 
        documento_identidad, 
        estado='Activo' 
    } = req.body;

    try {
        // --- 1. VALIDACIÓN DE ENTRADA ---
        
        if (!password_hash || password_hash.trim() === '') {
            return res.status(400).json({ message: 'La contraseña es requerida para la creación.' });
        }
        
        // 1. Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password_hash, 10); // 🟢 Renombrada a hashedPassword para claridad
        
        // 2. Verificar que el rol exista
        const rolExistente = await Rol.findByPk(id_rol);
        
        if (!rolExistente) {
            // 🟢 Usamos 404/400 para indicar que el recurso (Rol) no existe o es inválido
            return res.status(404).json({ message: `El rol con ID ${id_rol} no existe.` });
        }

        // 3. CREAR EL USUARIO
        const newUser = await User.create({
            nombre_usuario,
            password_hash: hashedPassword, // Usamos el hash
            correo_electronico,
            id_rol,
            documento_identidad,
            estado,
        });
        
        // Devolvemos la respuesta de éxito (201 Created)
        res.status(201).json({
            id_usuario: newUser.id_usuario,
            nombre_usuario: newUser.nombre_usuario,
            correo_electronico: newUser.correo_electronico,
            documento_identidad: newUser.documento_identidad,
            id_rol: newUser.id_rol,
            estado: newUser.estado
        });

    } catch (error) {
        // 🟢 Registramos el error completo en el servidor para debugging
        console.error('Error durante la creación del usuario:', error); 
        
        // --- 4. MANEJO DE ERRORES ESPECÍFICOS DE SEQUELIZE POR CAMPO ---

        // 🟢 Manejar error de UNICIDAD (409 Conflict)
        if (error.name === 'SequelizeUniqueConstraintError') {
            
            // Inspeccionamos la propiedad 'fields' del error para identificar el campo
            if (error.fields && error.fields.correo_electronico) {
                return res.status(409).json({ 
                    message: 'El correo electrónico ya está registrado. Por favor, use otro.' 
                });
            }
            if (error.fields && error.fields.documento_identidad) {
                return res.status(409).json({ 
                    message: 'El número de documento de identidad ya está registrado.' 
                });
            }
            
            // Manejo genérico para otras restricciones UNIQUE
            return res.status(409).json({ 
                message: 'Ya existe un usuario con uno de los datos proporcionados.' 
            });
        }
        
        // 🟢 Manejar error de VALIDACIÓN DE MODELO (400 Bad Request)
        if (error.name === 'SequelizeValidationError') {
            // Extraemos los mensajes de error de validación para mayor detalle
            const validationErrors = error.errors.map(err => err.message);
            return res.status(400).json({ 
                message: 'Error de validación en los datos proporcionados.', 
                details: validationErrors 
            });
        }
        
        // 🟢 Manejar error de CLAVE FORÁNEA (Foreign Key)
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ message: 'Error de clave foránea. El ID de rol proporcionado es inválido.' });
        }

        // --- 5. MANEJO GENÉRICO ---
        // Para cualquier otro fallo inesperado (500 Internal Server Error)
        res.status(500).json({ message: 'Error interno del servidor al crear el usuario.', details: error.message });
    }
};

// 3. Actualizar Usuario y Cambiar Rol
exports.updateUserAdmin = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const { password_hash, id_rol, ...updateData } = req.body; // Separamos password y id_rol
    
    // Si se proporciona una nueva contraseña, hashearla
    if (password_hash) {
      updateData.password_hash = await bcrypt.hash(password_hash, 10);
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
