const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  num_documento_usuario: String,
  nombre_usuario: String,
  correo_usuario: String,
  celular_usuario: String,
  password: String,
  rol: { type: mongoose.Schema.Types.ObjectId, ref: 'Rol' },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
