// models/cart.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');
const User = require('./user');

const Cart = sequelize.define('Cart', {
  id_carrito: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

Cart.belongsTo(User, { foreignKey: 'id_usuario' });

module.exports = Cart;