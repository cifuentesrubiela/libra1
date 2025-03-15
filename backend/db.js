// db.js
const mongoose = require('mongoose');

// URI de la base de datos MongoDB
const URI = 'mongodb://localhost:27017/libra';

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Base de datos conectada');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1); // Termina el proceso si no puede conectar
  }
};

module.exports = connectDB;
