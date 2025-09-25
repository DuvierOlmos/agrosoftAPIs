const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const Product = require('../models/product');
const Factura = require('../models/factura');

exports.checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { id_usuario: req.user.id_usuario },
      include: [{ model: CartItem, include: [Product] }],
    });

    if (!cart || cart.CartItems.length === 0) {
      return res.status(400).json({ message: 'El carrito está vacío.' });
    }

    const total = cart.CartItems.reduce((sum, item) => sum + (item.cantidad_productos * item.Product.precio_producto), 0);

    const order = await Order.create({
      id_usuario: req.user.id_usuario,
      id_estado_pedido: 1, // Asume que '1' es el ID para el estado 'Pendiente'
      fecha_pedido: new Date(),
    });

    await Promise.all(cart.CartItems.map(item => {
      return OrderItem.create({
        id_pedido: order.id_pedido,
        id_producto: item.id_producto,
        cantidad: item.cantidad_productos,
        precio_unitario: item.Product.precio_producto,
        subtotal: item.cantidad_productos * item.Product.precio_producto,
      });
    }));

    await Factura.create({
        id_pedido: order.id_pedido,
        fecha_factura: new Date(),
        total_factura: total,
        estado_factura: 'Generada',
    });

    await CartItem.destroy({ where: { id_carrito: cart.id_carrito } });

    res.status(201).json({ message: 'Pedido realizado con éxito.', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener el historial de pedidos de un usuario
exports.getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { id_usuario: req.user.id_usuario },
      include: [{
        model: OrderItem,
        include: [Product],
      }, {
        model: EstadoPedido,
      }],
      order: [['fecha_pedido', 'DESC']],
    });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial de pedidos.', details: error.message });
  }
};