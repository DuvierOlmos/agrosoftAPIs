// server.js

// 1. Importa los módulos necesarios
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db/db.config');

// 2. Importa las rutas de la API
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const descuentoRoutes = require('./routes/descuentoRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const pqrsRoutes = require('./routes/pqrsRoutes');
const tipoPqrsRoutes = require('./routes/tipoPqrsRoutes');
const estadoPqrsRoutes = require('./routes/estadoPqrsRoutes');
const facturaRoutes = require('./routes/facturaRoutes');
const rolRoutes = require('./routes/rolRoutes');
const estadoPedidoRoutes = require('./routes/estadoPedidoRoutes');

// 3. Importa los modelos para establecer las relaciones
const User = require('./models/user');
const Rol = require('./models/rol');
const Product = require('./models/product');
const Categoria = require('./models/categoria');
const Descuento = require('./models/descuento');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');
const Order = require('./models/order');
const OrderItem = require('./models/orderItem');
const EstadoPedido = require('./models/estadoPedido');
const Review = require('./models/review');
const Pqrs = require('./models/pqrs');
const TipoPqrs = require('./models/tipoPqrs');
const EstadoPqrs = require('./models/estadoPqrs');
const Factura = require('./models/factura');

// 4. Establece las relaciones entre modelos
// Relaciones de Usuario
User.belongsTo(Rol, { foreignKey: 'id_rol' });
Rol.hasMany(User, { foreignKey: 'id_rol' });
User.hasMany(Pqrs, { foreignKey: 'id_usuario' });
User.hasMany(Review, { foreignKey: 'id_usuario' });
User.hasOne(Cart, { foreignKey: 'id_usuario' });
User.hasMany(Order, { foreignKey: 'id_usuario' });

// Relaciones de Producto
Product.belongsTo(Categoria, { foreignKey: 'id_categoria' });
Categoria.hasMany(Product, { foreignKey: 'id_categoria' });
Product.belongsTo(Descuento, { foreignKey: 'id_descuento' });
Descuento.hasMany(Product, { foreignKey: 'id_descuento' });
Product.hasMany(CartItem, { foreignKey: 'id_producto' });
Product.hasMany(Review, { foreignKey: 'id_producto' });
Product.hasMany(OrderItem, { foreignKey: 'id_producto' });

// Relaciones de Carrito
Cart.hasMany(CartItem, { foreignKey: 'id_carrito' });
CartItem.belongsTo(Cart, { foreignKey: 'id_carrito' });
CartItem.belongsTo(Product, { foreignKey: 'id_producto' });

// Relaciones de Pedido
Order.belongsTo(User, { foreignKey: 'id_usuario' });
Order.belongsTo(EstadoPedido, { foreignKey: 'id_estado_pedido' });
EstadoPedido.hasMany(Order, { foreignKey: 'id_estado_pedido' });
Order.hasMany(OrderItem, { foreignKey: 'id_pedido' });
OrderItem.belongsTo(Order, { foreignKey: 'id_pedido' });
Order.hasOne(Factura, { foreignKey: 'id_pedido' });
Factura.belongsTo(Order, { foreignKey: 'id_pedido' });

// Relaciones de PQRS
Pqrs.belongsTo(User, { foreignKey: 'id_usuario' });
Pqrs.belongsTo(TipoPqrs, { foreignKey: 'id_tipo_pqrs' });
Pqrs.belongsTo(EstadoPqrs, { foreignKey: 'id_estado_pqrs' });
TipoPqrs.hasMany(Pqrs, { foreignKey: 'id_tipo_pqrs' });
EstadoPqrs.hasMany(Pqrs, { foreignKey: 'id_estado_pqrs' });

// Relaciones de Comentarios
Review.belongsTo(User, { foreignKey: 'id_usuario' });
Review.belongsTo(Product, { foreignKey: 'id_producto' });


// 5. Inicializa la aplicación Express
const app = express();

// 6. Middlewares
app.use(cors()); 
app.use(bodyParser.json());

// 7. Rutas de la API
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando!');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoriaRoutes);
app.use('/api/discounts', descuentoRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/pqrs', pqrsRoutes);
app.use('/api/pqrs-types', tipoPqrsRoutes);
app.use('/api/pqrs-statuses', estadoPqrsRoutes);
app.use('/api/invoices', facturaRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/order-statuses', estadoPedidoRoutes);




// 8. Sincronización con la base de datos y arranque del servidor
const PORT = process.env.PORT || 3001;

// Sincroniza los modelos con la base de datos
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos sincronizada correctamente.');
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
}).catch(err => {
  console.error('Error al sincronizar la base de datos:', err);
});