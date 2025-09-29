// models/descuento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');


const Descuento = sequelize.define('Descuento', {
  id_descuento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_descuento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_descuento: {
    type: DataTypes.STRING, // Ej: 'Porcentaje', 'Monto Fijo'
    allowNull: false,
  },
  valor_descuento: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  codigo_descuento: {
    type: DataTypes.STRING,
    unique: true,
  },
  activo: {
    type: DataTypes.BOOLEAN, // 1 para activo, 0 para inactivo
    defaultValue: true,
  },
}, {
  tableName: 'descuentos',
  timestamps: false,
});




module.exports = Descuento;