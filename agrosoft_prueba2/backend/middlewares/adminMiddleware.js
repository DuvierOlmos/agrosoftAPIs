// middlewares/adminMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Rol = require('../models/rol');

// Asegúrate de que esta variable de entorno esté configurada
const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_super_seguro';

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Acceso no autorizado. No se proporcionó un token.' });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);
    
    // Asume que el ID del usuario está en el token decodificado
    const user = await User.findByPk(decodedToken.id_usuario, {
      include: [Rol],
    });

    if (!user || user.Rol.nombre_rol !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado. Se requiere un rol de administrador.' });
    }

    req.user = user; // Adjunta el usuario a la solicitud para uso posterior
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado.', error: error.message });
  }
};

module.exports = adminMiddleware;