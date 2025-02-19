const express = require('express');//importa modulo express para crear servidor
const usuarioController = require('../controllers/userController');//importar controlador usuario

const router = express.Router();//crea enrutador  utilizando express.router

// Ruta para obtener todos los usuarios
router.get('/usuarios', usuarioController.getAllUsers);//define una ruta get en usuarios

//exportar enrutador para ser usado en otro archivos
module.exports = router;
