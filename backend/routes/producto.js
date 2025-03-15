const express = require('express');
const Producto = require('../models/Producto'); // Importar el modelo de Producto
const router = express.Router();

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un producto específico por su ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);  // Buscar el producto por ID
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(producto);  // Devolver el producto
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para agregar un producto
router.post('/', async (req, res) => {
  try {
    const { nombre_producto, descripcion_producto, precio_producto, categoria_producto, imagen_producto } = req.body;

    const nuevoProducto = new Producto({
      nombre_producto,
      descripcion_producto,
      precio_producto,
      categoria_producto,
      imagen_producto,
    });

    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

