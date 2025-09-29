// controllers/productController.js
const Product = require('../models/product');
const SubCategoria = require('../models/subCategoria');
const User = require('../models/user'); // Para incluir los datos del Productor
const Categoria = require('../models/categoria');
const Descuento = require('../models/descuento');
// 1. Obtener TODOS los productos (Admin puede ver todos, incluyendo pendientes)
exports.getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.findAll({
      // Incluir datos relacionados para la vista de administración
      include:[
        { model: SubCategoria, attributes: ['id_subCategoria'] }
      ]  
      ,
      order: [['id_producto', 'DESC']] // Últimos productos primero
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener todos los productos', details: error.message });
  }
};

// 2. Actualizar Producto (Incluye datos básicos y Aprobación)
exports.updateProductAdmin = async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id_producto: req.params.id }
    });
    
    if (!updated) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const updatedProduct = await Product.findByPk(req.params.id);
    res.status(200).json(updatedProduct);

  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto', details: error.message });
  }
};

// 3. Función Específica para APROBAR/RECHAZAR un Producto
exports.approveProduct = async (req, res) => {
  try {
    const { estado } = req.body; // estado debe ser 'Aprobado' o 'Rechazado'
    const validStates = ['Aprobado', 'Rechazado'];
    
    if (!validStates.includes(estado)) {
      return res.status(400).json({ message: 'Estado de aprobación inválido.' });
    }

    const [updated] = await Product.update({ estado_aprobacion: estado }, {
      where: { id_producto: req.params.id }
    });

    if (updated) {
      return res.status(200).json({ message: `Producto ${req.params.id} actualizado a estado: ${estado}` });
    }
    
    return res.status(404).json({ message: 'Producto no encontrado para actualizar.' });

  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar el estado de aprobación', details: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [
        // 2. Incluir la Subcategoría
        {
          model: SubCategoria,
       // Alias para la subcategoría del producto
          attributes: ['id_SubCategoria', 'nombre'],
          // 3. Incluir la Categoría Padre dentro de la Subcategoría
          include: [{
            model: Categoria,
            attributes: ['id_categoria', 'nombre_categoria']
          }]
        },
        // 4. Incluir los Descuentos aplicados (Relación Muchos a Muchos)
        {
          model: Descuento,
          through: { attributes: [] }, 
          attributes: ['id_descuento', 'nombre_descuento', 'valor_descuento', 'fecha_inicio', 'fecha_fin']
        }
      ]
    });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto', details: error.message });
  }
};

// 4. Eliminar Producto
exports.deleteProductAdmin = async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id_producto: req.params.id }
    });
    if (deleted) {
      return res.status(204).json({ message: 'Producto eliminado' });
    }
    return res.status(404).json({ message: 'Producto no encontrado para eliminar' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto', details: error.message });
  }
};

exports.createProductAdmin = async (req, res) => {
  try {
    // 1. Capturamos los datos del cuerpo de la solicitud
    const { 
      nombre_producto, 
      descripcion_producto, 
      precio_unitario,
      unidad_medida,      
      id_SubCategoria,
      cantidad
    } = req.body;

    // 2. Validación básica de campos requeridos (Ajustar según tu modelo)
    if (!nombre_producto || !precio_unitario || !id_SubCategoria) {
      return res.status(400).json({ message: 'Faltan campos obligatorios: nombre, precio, subcategoría o productor.' });
    }

    // 3. Crear el nuevo producto en la base de datos
    const newProduct = await Product.create({
      nombre_producto, 
      descripcion_producto, 
      precio_unitario,      
      unidad_medida,
      id_SubCategoria,
      cantidad
    });

    res.status(201).json({ 
        message: 'Producto creado exitosamente.',
        product: newProduct 
    });

  } catch (error) {
    // Manejar errores de Sequelize (ej. restricción de clave foránea, datos inválidos)
    res.status(500).json({ error: 'Error al crear el producto', details: error.message });
  }
};
