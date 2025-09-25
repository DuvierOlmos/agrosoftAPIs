const User = require('../models/user');
const Rol = require('../models/rol');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id_usuario, {
      attributes: { exclude: ['contrasena'] },
      include: [Rol],
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  // Usamos los nombres correctos de las columnas de la base de datos
  const { nombre_usuario, correo_electronico, documento_identidad } = req.body;
  try {
    const user = await User.findByPk(req.user.id_usuario);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    // Actualizamos el usuario usando los nuevos nombres de las columnas
    await user.update({ nombre_usuario, correo_electronico, documento_identidad });
    res.json({ message: 'Perfil actualizado con éxito.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      
      attributes: { exclude: ['password_hash'] },
      include: [Rol],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.destroy({
      where: { id_usuario: id }
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.json({ message: 'Usuario eliminado con éxito.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario.', details: error.message });
  }
};
