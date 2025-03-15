const mongoose = require('mongoose');

const RolSchema = new mongoose.Schema({
  rol: String,
});

module.exports = mongoose.model('Rol', RolSchema);
