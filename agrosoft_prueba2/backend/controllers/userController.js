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
  const { nombre, email, telefono } = req.body;
  try {
    const user = await User.findByPk(req.user.id_usuario);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    await user.update({ nombre, email, telefono });
    res.json({ message: 'Perfil actualizado con éxito.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['contrasena'] },
      include: [Rol],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};