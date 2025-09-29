// models/estado_pqrs.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');

const EstadoPqrs = sequelize.define('EstadoPqrs', {
  id_estado_pqrs: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_estado: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },},{
  tableName: 'estado_pqrs',
  timestamps: false,
});

module.exports = EstadoPqrs;