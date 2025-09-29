// controllers/categoriaController.js
const Categoria = require('../models/categoria');
const SubCategoria = require('../models/subCategoria');

// Función para obtener todas las categorías con sus subcategorías anidadas
exports.getAllCategoriasWithSub = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      // Usamos 'include' para traer las subcategorías relacionadas
      include: [{
        model: SubCategoria,
        as: 'SubCategorias', // Usar el alias definido en associations.js
        attributes: ['id_subCategoria', 'nombre']
      }]
    });
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorías', details: error.message });
  }
};

// --- CRUD BÁSICO para Categoría ---

// Crear Categoría
exports.createCategoria = async (req, res) => {
  try {
    const newCategoria = await Categoria.create(req.body);
    res.status(201).json(newCategoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la categoría', details: error.message });
  }
};

// Actualizar Categoría (por ID)
exports.updateCategoria = async (req, res) => {
    try {
        const [updated] = await Categoria.update(req.body, {
            where: { id_categoria: req.params.id }
        });
        if (updated) {
            const updatedCategoria = await Categoria.findByPk(req.params.id);
            return res.status(200).json(updatedCategoria);
        }
        return res.status(404).json({ message: 'Categoría no encontrada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la categoría', details: error.message });
    }
};

// --- CRUD BÁSICO para SubCategoría ---

// Crear SubCategoría
exports.createSubCategoria = async (req, res) => {
  try {
    const newSubCategoria = await SubCategoria.create(req.body);
    res.status(201).json(newSubCategoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la subcategoría', details: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id_categoria } = req.params;

    const category = await Categoria.findByPk(id_categoria, {
      // Opcional: Incluir las subcategorías asociadas si el frontend las necesita
      include: [{
        model: SubCategoria,
        as: 'SubCategorias', // Usar el alias definido en associations.js
        attributes: ['id_SubCategoria', 'nombre','id_categoria']
      }]
    });

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json(category);

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la categoría', details: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Categoria.destroy({
      where: { id_categoria: id }
    });

    if (deleted) {
      // Se eliminó 1 o más filas
      return res.status(204).json({ message: 'Categoría eliminada exitosamente' });
    }
    
    // Si no se eliminó nada, es que el ID no existía
    return res.status(404).json({ message: 'Categoría no encontrada para eliminar' });

  } catch (error) {
    // Error al intentar eliminar. Comúnmente es por restricción de clave foránea.
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(409).json({
        error: 'Conflicto de Datos',
        details: 'No se puede eliminar la categoría porque tiene subcategorías o productos asociados. Elimine las dependencias primero.'
      });
    }
    
    res.status(500).json({ error: 'Error al eliminar la categoría', details: error.message });
  }
};