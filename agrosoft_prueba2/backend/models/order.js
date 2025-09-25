// models/order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');
const User = require('./user');
const EstadoPedido = require('./estadoPedido');

const Order = sequelize.define('Order', {
  id_pedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha_pedido: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_entrega_estimada: {
    type: DataTypes.DATE,
  },
  direccion_envio: {
    type: DataTypes.STRING,
  },
});

Order.belongsTo(User, { foreignKey: 'id_usuario' });
Order.belongsTo(EstadoPedido, { foreignKey: 'id_estado_pedido' });

module.exports = Order;