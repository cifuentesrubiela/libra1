const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre_producto: {
    type: String,
    required: true,
    maxlength: 50,
  },
  descripcion_producto: {
    type: String,
    maxlength: 255,
    default: null,
  },
  precio_producto: {
    type: Number,
    required: true,
    min: 0,
  },
  categoria_producto: {
    type: String,
    required: true,
    maxlength: 30,
  },
  imagen_producto: {
    type: String,
    maxlength: 255,
    default: null,
  }
}, { timestamps: true });

const Producto = mongoose.model('Producto', ProductoSchema);

module.exports = Producto;
