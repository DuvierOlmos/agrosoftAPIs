// controllers/estadoPedidoController.js

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
    const estados = await EstadoPedido.findAll();
    res.json(estados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los estados de pedidos.' });
  }
};