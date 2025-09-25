// models/estadoPqrs.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');

const EstadoPqrs = sequelize.define('EstadoPqrs', {
  id_estado_pqrs: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_estado_pqrs: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = EstadoPqrs;