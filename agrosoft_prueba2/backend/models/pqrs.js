// models/pqrs.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');
const User = require('./user');
const TipoPqrs = require('./tipoPqrs');
const EstadoPqrs = require('./estadoPqrs');

const Pqrs = sequelize.define('Pqrs', {
  id_pqrs: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  asunto_pqrs: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion_pqrs: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha_envio_pqrs: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  respuesta_admin: {
    type: DataTypes.TEXT,
  },
  fecha_respuesta: {
    type: DataTypes.DATE,
  },
});

Pqrs.belongsTo(User, { foreignKey: 'id_usuario' });
Pqrs.belongsTo(TipoPqrs, { foreignKey: 'id_tipo_pqrs' });
Pqrs.belongsTo(EstadoPqrs, { foreignKey: 'id_estado_pqrs' });

module.exports = Pqrs;