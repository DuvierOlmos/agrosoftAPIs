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
  documento_identidad: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.STRING,
  },
}, {
    // Aquí se especifica el nombre de la tabla
    tableName: 'usuarios',
    timestamps: false // Opcional, si no quieres las columnas createdAt y updatedAt
});

User.belongsTo(Rol, { foreignKey: 'id_rol' });

module.exports = User;