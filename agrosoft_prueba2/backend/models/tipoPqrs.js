// models/tipoPqrs.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');

const TipoPqrs = sequelize.define('TipoPqrs', {
  id_tipo_pqrs: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_tipo_pqrs: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = TipoPqrs;