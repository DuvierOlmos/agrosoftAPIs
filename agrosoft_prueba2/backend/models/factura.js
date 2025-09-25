// models/factura.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');
const Order = require('./order');

const Factura = sequelize.define('Factura', {
  id_factura: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha_factura: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total_factura: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  estado_factura: {
    type: DataTypes.STRING,
  },
});

Factura.belongsTo(Order, { foreignKey: 'id_pedido' });

module.exports = Factura;