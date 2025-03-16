const mongoose = require('mongoose');

const VentaSchema = new mongoose.Schema({
  fecha_venta: { type: Date, default: Date.now },
  cantidad_venta: { type: Number, required: true },
  total_venta: { type: Number, required: true },
  metodoPago_venta: { type: String, enum: ['Efectivo', 'Tarjeta'], required: true },
  fk_id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fk_id_detalle_venta: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DetalleVenta' }],
});

module.exports = mongoose.model('Venta', VentaSchema);