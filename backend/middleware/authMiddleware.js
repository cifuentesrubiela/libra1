const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    req.userId = decoded.id;
    req.userRole = decoded.rol;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.userRole !== 'Administrador') return res.status(403).json({ message: 'No autorizado' });
  next();
};
