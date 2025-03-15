const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const secretKey = 'your_secret_key';

exports.register = async (req, res) => {
  const { num_documento_usuario, nombre_usuario, correo_usuario, celular_usuario, password, rol } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new Usuario({
    num_documento_usuario,
    nombre_usuario,
    correo_usuario,
    celular_usuario,
    password: hashedPassword,
    rol,
  });

  await newUser.save();
  res.status(201).json({ message: 'Usuario registrado correctamente' });
};

exports.login = async (req, res) => {
  const { correo_usuario, password } = req.body;

  const user = await Usuario.findOne({ correo_usuario }).populate('rol');
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user._id, rol: user.rol.rol }, secretKey, { expiresIn: '1h' });
  res.json({ token, user });
};

// Nueva función para manejar logout
exports.logout = (req, res) => {
  try {
    // Enviar respuesta de éxito
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Hubo un problema al cerrar sesión' });
  }
};

