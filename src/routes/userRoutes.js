
//router.post('/usuarios', upload.single('foto'), usuarioController.createUser);
const express = require('express'); // Importar Express
const usuarioController = require('../controllers/userController');

const router = express.Router(); // 🚀 Definir el router antes de usarlo
//obtener todos
router.get('/usuarios', usuarioController.getAllUsers);
//cear
router.post('/usuarios', usuarioController.createUser);

//eliminar
router.delete('/usuarios/:id_usuario', usuarioController.deleteUser)

module.exports = router; // Exportar el router
