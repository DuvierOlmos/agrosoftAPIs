// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');
const Rol = require('./rol');

const User = sequelize.define('User', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
  },
});

User.belongsTo(Rol, { foreignKey: 'id_rol' });

module.exports = User;