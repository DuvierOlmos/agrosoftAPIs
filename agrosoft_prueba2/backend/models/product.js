// models/product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');
const Categoria = require('./categoria');
const Descuento = require('./descuento');

const Product = sequelize.define('Product', {
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_producto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion_producto: {
    type: DataTypes.TEXT,
  },
  precio_producto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  imagen_producto: {
    type: DataTypes.STRING,
  },
});

Product.belongsTo(Categoria, { foreignKey: 'id_categoria' });
Product.belongsTo(Descuento, { foreignKey: 'id_descuento' });

module.exports = Product;