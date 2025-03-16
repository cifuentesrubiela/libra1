const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre_producto: { type: String, required: true, maxlength: 50 },
  descripcion_producto: { type: String, maxlength: 255, default: null },
  precio_producto: { type: Number, required: true, min: 0 },
  cantidad_producto: { type: Number, required: true, min: 0 }, // Stock disponible
  categoria_producto: { type: String, required: true, maxlength: 30 },
  imagen_producto: { type: String, maxlength: 255, default: null }
}, { timestamps: true });

// 🔥 ¡Asegúrate de que esta línea esté en tu archivo!
module.exports = mongoose.model('Producto', ProductoSchema);



