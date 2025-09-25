// models/estadoPedido.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');

const EstadoPedido = sequelize.define('EstadoPedido', {
  id_estado_pedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_estado_pedido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = EstadoPedido;