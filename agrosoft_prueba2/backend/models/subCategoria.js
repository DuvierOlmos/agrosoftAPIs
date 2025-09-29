// models/subcategoria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');

const SubCategoria = sequelize.define('SubCategoria', {
  id_SubCategoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  id_categoria: { // Clave foránea que apunta a Categoria
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'subcategoria',
  timestamps: false,
});

module.exports = SubCategoria;