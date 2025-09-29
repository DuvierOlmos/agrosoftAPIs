// models/product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');


const Product = sequelize.define('Producto', {
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
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    unidad_medida: {
        // En la BD es 'kg' (STRING), no un INTEGER con defaultValue: 0
        type: DataTypes.STRING,
    },
    url_imagen: {
        // Campo 'url_imagen' de la BD
        type: DataTypes.STRING,
    },
    // CLAVE FORÁNEA (Coincide con la columna de la BD)
    id_SubCategoria: { 
        type: DataTypes.INTEGER,
        allowNull: true, // Asumimos NULL si no tiene referencia, aunque en la BD se ve un valor (3, 2...)
    },
    estado_producto: {
        // En la BD aparece 'Activo' (STRING)
        type: DataTypes.STRING,
    },
    
    // CAMPOS DE FECHA Y CANTIDAD QUE SE DEBEN MAPE AR DIRECTAMENTE
    fecha_creacion: {
        type: DataTypes.DATE,
    },
    fecha_ultima_modificacion: {
        type: DataTypes.DATE,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // En la BD se ve NULL, puedes dejar NULL o 0 como default
    },

   
}, {
    tableName: 'producto',
    timestamps: false,
    
});

module.exports = Product;