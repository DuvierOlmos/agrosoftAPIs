// models/descuento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');
const User = require('./user');
const Product = require('./product'); 
const TipoDescuento = require('./tipoDescuento');

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
  tipo_descuento: {
    type: DataTypes.STRING,
  },
  valor_descuento: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  fecha_inicio: {
    type: DataTypes.DATE,
  },
  fecha_fin: {
    type: DataTypes.DATE,
  },
  codigo_descuento: {
    type: DataTypes.STRING,
    unique: true,
  },
  activo: {
    type: DataTypes.INTEGER,
  }
}, {
    tableName: 'descuento',
    timestamps: false
});
//Descuento.belongsTo(Product, { foreignKey: 'id_producto' });
//Descuento.belongsTo(User, { foreignKey: 'id_usuario' });


module.exports = Descuento;