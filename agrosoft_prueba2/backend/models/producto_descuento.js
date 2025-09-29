// models/producto_descuento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');

const ProductoDescuento = sequelize.define('ProductoDescuento', {
  // Las claves foráneas se definen aquí, pero Sequelize las maneja por defecto
  // gracias a la configuración en associations.js. Se definen explícitamente para claridad.
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Clave compuesta 1
    allowNull: false,
  },
  id_descuento: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Clave compuesta 2
    allowNull: false,
  },
}, {
  // Opciones del Modelo
  tableName: 'producto_descuento', // Nombre exacto de la tabla de unión
  timestamps: false,
  // Definimos la clave primaria compuesta (opcional si ya usamos primaryKey: true arriba)
  indexes: [
    {
      unique: true,
      fields: ['id_producto', 'id_descuento'],
    },
  ],
});

module.exports = ProductoDescuento;