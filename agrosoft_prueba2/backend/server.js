// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');



// Cargar variables de entorno
dotenv.config();
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // ⬅️ CAMBIA ESTO AL PUERTO EXACTO DE TU FRONTEND
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
}));
// --- 1. Importar la Conexión y las Asociaciones ---
// Importamos la instancia de sequelize y aseguramos que las asociaciones se carguen
const { sequelize, EstadoPedido } = require('./models/associations'); 

// --- 2. Importar Rutas de los Módulos del Administrador ---
const rolRoutes = require('./routes/rolRoutes');
const userRoutes = require('./routes/userRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const descuentoRoutes = require('./routes/descuentoRoutes');
const productoDescuentoRoutes = require('./routes/productoDescuentoRoutes');
const productRoutes = require('./routes/productRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const pqrsRoutes = require('./routes/pqrsRoutes');
const estadoPqrsRoutes = require('./routes/estadoPqrsRoutes');
const tipoPqrsRoutes = require('./routes/tipoPqrsRoutes');
const estadoPedidoRoutes = require('./routes/estadoPedidoRoutes');





const PORT = process.env.PORT || 3001;

// --- 3. Middlewares Globales ---
app.use(bodyParser.json());



// --- 4. Conexión y Sincronización de Rutas ---

// Ruta de prueba (ej: /api/status)
app.get('/api/status', (req, res) => {
    res.json({ message: 'API Agrosoft está funcionando.' });
});

// Rutas de Módulos del Administrador
app.use('/api/roles', rolRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoriaRoutes);

/*app.use('/api/discounts', descuentoRoutes);
app.use('/api/product-discounts', productoDescuentoRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', pedidoRoutes);*/

app.use('/api/pqrs', pqrsRoutes);
app.use('/api/tipoPqrs', tipoPqrsRoutes);
app.use('/api/estadoPedido', estadoPedidoRoutes);
app.use('/api/estadoPqrs', estadoPqrsRoutes);





// --- 5. Sincronización de Base de Datos 
sequelize.sync({ force: false }).then(() => {
    console.log('Base de datos sincronizada correctamente.');
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
}).catch(err => {
    console.error('Error al sincronizar la base de datos:', err.message);
});