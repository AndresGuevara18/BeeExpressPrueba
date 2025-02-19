const db = require('../config/database'); // Importa la conexión a la base de datos
const Cargo = require('../models/cargoModel'); // Importa el modelo Cargo

const cargoService = {
    // Obtener todos los cargos
    getAllCargos: (callback) => {
        db.query('SELECT * FROM cargo', (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            // Convertir cada fila en un objeto Cargo
            const cargos = results.map(row => 
                new Cargo(row.id_cargo, row.nombre_cargo, row.descripcion)
            );
            callback(null, cargos);
        });
    },
};

// Exporta el servicio para que pueda ser utilizado en otros archivos
module.exports = cargoService;
