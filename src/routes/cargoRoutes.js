const express = require('express'); // Importa Express
const cargoController = require('../controllers/cargoController'); // Importa el controlador de Cargo

const router = express.Router(); // Crea un enrutador con Express.Router()

// Ruta para obtener todos los cargos
router.get('/cargos', cargoController.getAllCargos);

// Exporta el enrutador para ser usado en otros archivos
module.exports = router;
