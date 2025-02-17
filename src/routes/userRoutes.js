const express = require('express');
const usuarioController = require('../controllers/userController');

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/usuarios', usuarioController.getAllUsers);

module.exports = router;
