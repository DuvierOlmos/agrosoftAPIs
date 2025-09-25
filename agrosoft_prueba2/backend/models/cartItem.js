// models/cartItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');
const Cart = require('./cart');
const Product = require('./product');

const CartItem = sequelize.define('CartItem', {
  id_detalle_carrito: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cantidad_productos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

CartItem.belongsTo(Cart, { foreignKey: 'id_carrito' });
CartItem.belongsTo(Product, { foreignKey: 'id_producto' });

module.exports = CartItem;