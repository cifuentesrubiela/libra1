const express = require('express');
const router = express.Router();
const { registrarVenta, obtenerVentas } = require('../controllers/ventasController');

// Ruta para registrar una nueva venta
router.post('/registrar', registrarVenta);

// Ruta para obtener todas las ventas
router.get('/', obtenerVentas);

module.exports = router;