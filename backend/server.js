const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/libra');

app.listen(4000, () => console.log('Server running on port 4000'));
