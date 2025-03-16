const mongoose = require('mongoose');

const DetalleVentaSchema = new mongoose.Schema({
  cantidad_detalle_venta: { type: Number, required: true },
  precioUnitario_detalle_venta: { type: Number, required: true },
  total_detalle_venta: { type: Number, required: true },
});

module.exports = mongoose.model('DetalleVenta', DetalleVentaSchema);