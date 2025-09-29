// models/pedido.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');

const Pedido = sequelize.define('Pedido', {
    id_pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_pedido: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    total_pedido: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    // 
    id_metodo_pago: {
        type: DataTypes.INTEGER,
    },
    // 
    direccion_envio: {
        type: DataTypes.STRING,
    },
    // 
    ciudad_envio: {
        type: DataTypes.STRING,
    },
    // 
    codigo_postal_envio: {
        type: DataTypes.STRING,
    },
    
   
    id_estado_pedido: { 
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    
    // 
    fecha_entrega_estimada: {
        type: DataTypes.DATE,
    },
    // 
    fecha_entrega_real: {
        type: DataTypes.DATE,
    },
    
    numero_seguimiento: {
        type: DataTypes.STRING,
    },
   
    notas_pedido: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'pedidos',
    timestamps: false,
});


module.exports = Pedido;