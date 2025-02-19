const cargoService = require('../services/cargoServices'); // Importar el servicio de cargo

// Objeto que contendrá los métodos del controlador
const cargoController = {

    // Método para obtener todos los cargos
    getAllCargos: (req, res) => { // Maneja la solicitud para obtener los cargos
        cargoService.getAllCargos((err, cargos) => { // Llama a la función del servicio con un callback
            if (err) { // Si hay error, responde con código 500
                res.status(500).json({ error: "Error al obtener los cargos" });
                return;
            }
            res.json(cargos); // Responde con la lista de cargos en formato JSON
        });
    }
};

// Exporta el objeto para ser utilizado en otros archivos
module.exports = cargoController;
