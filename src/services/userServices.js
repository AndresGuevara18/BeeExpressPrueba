const db = require('../config/database');//importa el modelo base datos contiene conexion
const Usuario = require('../models/userModel');//importar modelo de usuario

const usuarioService = {//objeto contendra los metodos del servicio
    
    //metodo obtendra todos los usuarios
    getAllUsers: (callback) => {
        db.query('SELECT * FROM usuario', (err, results) => {// ejecuta consulta sql
            if (err) {//si hay error ejecuta un bloque
                callback(err, null);
                return;
            }
            // Convertir cada fila en un objeto Usuario
            const usuarios = results.map(row => 
                new Usuario(row.id_usuario, row.tipo_documento, row.numero_documento, row.nombre_empleado, row.email_empleado, row.contrasena, row.id_cargo)
            );
            callback(null, usuarios);
        });
    }
};

//exporta para que pueda ser usado en otros archivos
module.exports = usuarioService;
