// models/descuento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');
const User = require('./user');

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
  codigo_descuento: {
    type: DataTypes.STRING,
    unique: true,
  },
  valor_descuento: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  fecha_inicio_descuento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_fin_descuento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Descuento.belongsTo(User, { foreignKey: 'id_usuario' });

module.exports = Descuento;