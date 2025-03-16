const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Usa una clave secreta segura desde variables de entorno
const secretKey = process.env.JWT_SECRET || 'your_secret_key';

// Registro de usuario
exports.register = async (req, res) => {
  const { num_documento_usuario, nombre_usuario, correo_usuario, celular_usuario, password, rol } = req.body;

  // Validar datos requeridos
  if (!nombre_usuario || !correo_usuario || !password) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    // Verificar si el usuario ya está registrado
    const existingUser = await Usuario.findOne({ correo_usuario });
    if (existingUser) {
      return res.status(400).json({ error: 'Correo ya registrado' });
    }

    // Crear y almacenar usuario
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
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  const { correo_usuario, password } = req.body;

  // Validar datos requeridos
  if (!correo_usuario || !password) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    // Buscar usuario con su rol
    const user = await Usuario.findOne({ correo_usuario }).populate('rol');
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Crear el token
    const token = jwt.sign(
      {
        id: user._id,
        nombre_usuario: user.nombre_usuario,
        rol: user.rol,
      },
      secretKey,
      { expiresIn: '1h' }
    );

    console.log('Inicio de sesión exitoso:', user.nombre_usuario);

    // Responder con el token y datos del usuario
    res.json({
      token,
      user: {
        id: user._id,
        nombre_usuario: user.nombre_usuario,
        correo_usuario: user.correo_usuario,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Cerrar sesión
exports.logout = (req, res) => {
  try {
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    res.status(500).json({ error: 'Hubo un problema al cerrar sesión' });
  }
};
