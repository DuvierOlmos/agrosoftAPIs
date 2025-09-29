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
  password_hash: { // Almacena la contraseña cifrada
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo_electronico: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Debe ser único para cada usuario
  },
  id_rol: { // Clave foránea que apunta al modelo Rol
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  documento_identidad: {
    type: DataTypes.STRING,
  },
  estado: { // Ej: 'Activo', 'Inactivo'
    type: DataTypes.STRING,
  },
}, {
  // Opciones del Modelo
  tableName: 'usuarios', // Nombre real de la tabla en la base de datos
  timestamps: false, // Asumo que no usas las columnas createdAt y updatedAt
});

// Importante: No definir la asociación aquí para evitar dependencias circulares.
// La asociación User.belongsTo(Rol, ...) se hará en models/associations.js

module.exports = User;