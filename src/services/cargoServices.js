const db = require('../config/database'); // Importa la conexión a la base de datos
const Cargo = require('../models/cargoModel'); // Importa el modelo Cargo

const cargoService = {
    // Obtener todos los cargos
    getAllCargos: (callback) => {
        const query = 'SELECT * FROM cargo'; // Consulta SQL para obtener todos los cargos
        db.query(query, (err, results) => { // Ejecuta la consulta en la base de datos
            if (err) return callback(err, null); // Si hay error, lo devuelve
            callback(null, results); // Si no hay error, devuelve los resultados
        });
    },

    //buscar cargo mediante id
    getCargoById:(id_cargo, callback) =>{
        const query = 'SELECT * FROM cargo WHERE id_cargo = ?';//consulta sql

        // Ejecuta la consulta, pasando el ID como parámetro
        db.query(query, [id_cargo], (err, result) => {
            if (err) {//si hay un error
                return callback(err, null);//retornar error al callback
            }
            
            //si no encuentra cargo con id ingresado
            if (result.length === 0){
                return callback(null, null);//devuelve null indica que no existe
            }
            
            //devuelve el primer resultado encontrado
            callback(null, result[0]);
        });
    },

    //crear cargo
    // Método para crear un nuevo cargo
    createCargo: (cargoData, callback) => {
        const query = 'INSERT INTO cargo (nombre_cargo, descripcion) VALUES (?, ?)'; // Consulta SQL para insertar un nuevo cargo
        db.query(query, [cargoData.nombre_cargo, cargoData.descripcion], (err, results) => { // Ejecuta la consulta
            if (err) return callback(err, null); // Si hay error, lo devuelve
            callback(null, { id_cargo: results.insertId, ...cargoData }); // Retorna el nuevo cargo insertado
        });
    }
};

// Exporta el servicio para que pueda ser utilizado en otros archivos
module.exports = cargoService;
