const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/gestion', [verifyToken, isAdmin], (req, res) => {
  res.json({ message: 'Acceso a gestión de administrador' });
});

module.exports = router;
