// models/categoria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');

const Categoria = sequelize.define('Categoria', {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  
});

module.exports = Categoria;