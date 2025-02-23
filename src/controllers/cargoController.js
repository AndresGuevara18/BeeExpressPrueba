const Cargo = require('../models/cargoModel');
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
    }, 

    //metodo buscar cargo mediante el id
    getCargoById: (req, res) =>{
        const { id_cargo } = req.params; // Obtiene el ID del parámetro en la URL

        // Llama al servicio pasando el ID
        cargoService.getCargoById(id_cargo, (err, cargo) =>{
            if (err){
                res.status(500).json({ error: "Error al bsucar cargo en controller" });// Error en la consulta
                return;
            }

            if (!cargo) {//si no lo encuentra
                res.status(400).json({ error: "Cargo no encontrado"});
                return;
            }

            res.json(cargo);// Si lo encuentra, lo devuelve en formato JSON
        });
    },

    //metodo agregar cargo
    createCargo: (req, res) =>{
        //extrae datos enviados del cuerpo de la solicitud
        const cargoData = req.body;

        //llamdo metodo servicio para crear cargo
        cargoService.createCargo(cargoData, (err, nuevoCargo) => {
            if (err) {
                res.status(500).json({ error: "error al  crear cargo"});
                return;
            }

            //res.status(201).json(nuevoCargo);
            res.status(201).json({
                message: "✅ Cargo agregado correctamente",
                redirect: "/cargo.html" // URL a la que se redirigirá el usuario
            });
        });
    }
};

// Exporta el objeto para ser utilizado en otros archivos
module.exports = cargoController;
