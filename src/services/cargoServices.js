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

    //crear cargo
    createCargo: (carData, callback) => {
        const { nombre_cargo, descripcion } = carData;
    
        // Corrección en la consulta SQL
        db.query(
            'INSERT INTO cargo (nombre_cargo, descripcion) VALUES (?, ?)', 
            [nombre_cargo, descripcion], 
            (err, result) => {
                if (err) {
                    callback(err, null);
                    return;
                }
    
                // Instancia del nuevo cargo con el ID insertado
                const nuevoCargo = new Cargo(result.insertId, nombre_cargo, descripcion);
                callback(null, nuevoCargo);
            }
        );
    }
};

// Exporta el servicio para que pueda ser utilizado en otros archivos
module.exports = cargoService;
