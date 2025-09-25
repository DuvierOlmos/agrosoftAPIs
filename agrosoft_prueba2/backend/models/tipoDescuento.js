// models/tipoDescuento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');

const TipoDescuento = sequelize.define('TipoDescuento', {
  id_tipo_descuento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_tipo_descuento: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  descripcion_tipo: {
    type: DataTypes.TEXT,
  },
}, {
  // Opciones del modelo
  tableName: 'producto_descuento',
  timestamps: false
});

module.exports = TipoDescuento;