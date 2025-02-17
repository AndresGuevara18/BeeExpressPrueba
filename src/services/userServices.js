const db = require('../config/database');
const Usuario = require('../models/userModel');

const usuarioService = {
    getAllUsers: (callback) => {
        db.query('SELECT * FROM usuario', (err, results) => {
            if (err) {
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

module.exports = usuarioService;
