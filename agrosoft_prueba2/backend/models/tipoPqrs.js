const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');

const TipoPqrs = sequelize.define('TipoPqrs', {
  id_tipo_pqrs: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  // Opciones del Modelo
  tableName: 'tipo_pqrs',
  timestamps: false,
});

module.exports = TipoPqrs;