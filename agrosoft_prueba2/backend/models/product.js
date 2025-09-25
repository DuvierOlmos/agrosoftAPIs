// models/product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');
const Categoria = require('./categoria'); // assuming this links to the category table
const Descuento = require('./descuento'); // assuming this links to the discount table

const Product = sequelize.define('Product', {
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
    type: DataTypes.STRING,
  },
  url_imagen: {
    type: DataTypes.STRING,
  },
  id_SubCategoria: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
        model: 'categorias',
        key: 'id_categoria'
    }
  },
  estado_producto: {
    type: DataTypes.STRING,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
  },
  fecha_ultima_modificacion: {
    type: DataTypes.DATE,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
    tableName: 'producto',
    timestamps: false // The table has fecha_creacion and fecha_ultima_modificacion, not the default timestamps.
});

// Assuming 'id_categoria' is the correct foreign key for the 'id_SubCategoria' column
Product.belongsTo(Categoria, { foreignKey: 'id_SubCategoria', targetKey: 'id_categoria' });
// Since the database image doesn't show a column for descuento, we'll keep the relationship but note its absence.
Product.belongsTo(Descuento, { foreignKey: 'id_descuento' });

module.exports = Product;