const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Cambia esto por una variable de entorno

// Middleware para verificar el token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; // Usar el estándar 'Authorization'

  if (!token) {
    return res.status(403).json({ message: 'Acceso denegado: No se proporcionó un token' });
  }

  // Extraer el token si viene con el formato "Bearer token"
  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Formato de token inválido' });
  }

  jwt.verify(tokenParts[1], secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    req.userId = decoded.id;
    req.userRole = decoded.rol;
    next();
  });
};

// Middleware para verificar si el usuario es Administrador
exports.isAdmin = (req, res, next) => {
  if (req.userRole !== 'Administrador') {
    return res.status(403).json({ message: 'Acceso restringido: No tienes permisos de administrador' });
  }
  next();
};
