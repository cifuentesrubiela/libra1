// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');  // Importar la conexión a la base de datos
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Conectar a la base de datos
connectDB();  // Llamar a la función que conecta con MongoDB

// Iniciar el servidor
app.listen(4000, () => console.log('Server running on port 4000'));
