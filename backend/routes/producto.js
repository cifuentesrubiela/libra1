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
    const { nombre_producto, descripcion_producto, precio_producto, cantidad_producto, categoria_producto, imagen_producto } = req.body;

    const nuevoProducto = new Producto({
      nombre_producto,
      descripcion_producto,
      precio_producto,
      cantidad_producto,
      categoria_producto,
      imagen_producto,
    });

    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para editar un producto por su ID
router.put('/:id', async (req, res) => {
  try {
    const { nombre_producto, descripcion_producto, precio_producto, cantidad_producto, categoria_producto, imagen_producto } = req.body;

    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id, // ID del producto a actualizar
      {
        nombre_producto,
        descripcion_producto,
        precio_producto,
        cantidad_producto,
        categoria_producto,
        imagen_producto,
      },
      { new: true } // Retorna el documento actualizado
    );

    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(productoActualizado); // Devuelve el producto actualizado
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar un producto por su ID
router.delete('/:id', async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);

    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto eliminado con éxito', producto: productoEliminado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


