const Product = require('../models/product');
const Categoria = require('../models/categoria');
const Descuento = require('../models/descuento');
const Review = require('../models/review');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [Categoria, Descuento],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      include: [Categoria, Descuento, Review],
    });
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.destroy({
      where: { id_producto: id }
    });
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }
    res.json({ message: 'Producto eliminado con éxito.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto.' });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  try {
    const [updatedRows] = await Product.update(productData, {
      where: { id_producto: id },
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado o no hay cambios para actualizar.' });
    }

    const updatedProduct = await Product.findByPk(id);
    res.json({ message: 'Producto actualizado con éxito.', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto.', details: error.message });
  }
};