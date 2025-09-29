// controllers/pedidoController.js
const Pedido = require('../models/pedido');
const DetallePedido = require('../models/detalle_pedido');
const User = require('../models/user'); // Para ver quién hizo el pedido
const Product = require('../models/product'); // Para ver qué se compró
const EstadoPedido = require('../models/estadoPedido');
// 1. Obtener TODOS los Pedidos con detalles anidados
exports.getAllPedidosAdmin = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      // Incluimos las relaciones clave para la vista del Admin
      include: [
        
        
        { model: EstadoPedido, as: 'Estado' }, 
        { model: DetallePedido, as: 'Detalles' },
      ],
         order: [['fecha_pedido', 'DESC']] // Pedidos más recientes primero
     });
      res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pedidos', details: error.message });
  }
};

// 2. Obtener un Pedido por ID con todos sus detalles
exports.getPedidoByIdAdmin = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id, {
      include: [
        { model: User, as: 'Cliente', attributes: ['nombre_usuario', 'correo_electronico'] },
        {
          model: DetallePedido,
          as: 'Detalles',
          include: [{ model: Product, attributes: ['nombre_producto'] }]
        }
      ]
    });
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el pedido', details: error.message });
  }
};


// 3. Actualizar el Estado del Pedido (Función clave del Admin) 
exports.updateEstadoPedido = async (req, res) => {
  try {
    // 1. Obtener el ID del estado y el ID del pedido
    const { id_estado_pedido } = req.body;
    const id_pedido = req.params;
    
    // 2. Validación de Estado (¡CRÍTICO! Usamos la DB para validar si el ID es válido)
    const estadoObj = await EstadoPedido.findByPk(id_estado_pedido);
    
    if (!estadoObj) {
      return res.status(400).json({ 
        message: 'ID de estado de pedido inválido o no encontrado en el catálogo.' 
      });
    }

    // 3. Actualizar el pedido usando el ID de la clave foránea
    const [updatedCount] = await Pedido.update(
      { 
        id_estado_pedido: id_estado_pedido,
        fecha_ultima_actualizacion: new Date(), // Buena práctica: registrar cuándo se gestionó
      }, 
      {
        where: { id_pedido: id_pedido }
      }
    );

    // 4. Verificación y Respuesta Mejorada
    if (updatedCount) {
      // Problema de "No obtener datos": Lo solucionamos obteniendo el pedido actualizado.
      const updatedPedido = await Pedido.findByPk(id_pedido, {
         // Incluir el estado para mostrar el nombre en la respuesta
         include: [{ 
            model: EstadoPedido, 
            as: 'EstadoPedido', // Usa el alias definido en associations.js
            attributes: ['id_estado_pedido'] 
         }]
      });
      
      return res.status(200).json({ 
        message: `Estado del Pedido ${id_pedido} actualizado a: ${estadoObj.nombre_estado}`,
        pedido: updatedPedido
      });
    }
    
    return res.status(404).json({ message: 'Pedido no encontrado para actualizar.' });

  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar el estado del pedido', details: error.message });
  }
};