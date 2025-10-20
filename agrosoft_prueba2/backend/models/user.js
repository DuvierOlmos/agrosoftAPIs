// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');

const User = sequelize.define('User', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo_electronico: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
  id_rol: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  documento_identidad: {
    type: DataTypes.STRING,
  },
  estado: { 
    type: DataTypes.STRING,
  },
}, {
  // Opciones del Modelo
  tableName: 'usuarios', 
  timestamps: false, 
});


module.exports = User;