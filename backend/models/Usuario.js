const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  num_documento_usuario: { type: Number, required: true, unique: true },
  nombre_usuario: { type: String, required: true, maxlength: 50 },
  correo_usuario: { type: String, required: true, unique: true },
  celular_usuario: { type: String, maxlength: 15 },
  rol: { type: String, required: true, enum: ['ADMIN', 'USER'], default: 'USER' },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Usuario', UsuarioSchema);
