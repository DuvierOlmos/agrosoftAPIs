// controllers/estadoPedidoController.js
const Pedido = require('../models/pedido');
const EstadoPedido = require('../models/estadoPedido'); 



// Crear un nuevo estado de pedido (solo para administradores)
exports.createEstadoPedido = async (req, res) => {
  try {
    const estado = await EstadoPedido.create(req.body);
    res.status(201).json(estado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el estado de pedido.' });
  }
};

// Obtener todos los estados de pedidos (acceso público o para administradores)
exports.getAllEstadoPedidos = async (req, res) => {
  try {
    const id_estado_pedido = req.params.id_estado_pedido;
    const estados = await EstadoPedido.findAll(id_estado_pedido);
    res.json(estados);
  } catch (error) {
    console.error('Detalle del Error de Sequelize:', error); 
    // 💡 Usa 'return' para evitar el error de headers
    return res.status(500).json({ 
        error: 'Error al obtener los estados de pedidos.', 
        details: error.message 
})}
};


// Asumimos que tienes este modelo

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
            as: 'Estado', // Usa el alias definido en associations.js
            attributes: ['nombre_estado'] 
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