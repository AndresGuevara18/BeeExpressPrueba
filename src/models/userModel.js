const db = require('../config/database');

const User = {
    getAllUsers: (callback) => {
        db.query('SELECT * FROM usuario', callback);
    },
    
    getUserById: (id, callback) => {
        db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id], callback);
    },

    createUser: (userData, callback) => {
        const { tipo_documento, numero_documento, nombre_empleado, email_empleado, contrasena, id_cargo } = userData;
        db.query(
            'INSERT INTO usuario (tipo_documento, numero_documento, nombre_empleado, email_empleado, contrasena, id_cargo) VALUES (?, ?, ?, ?, ?, ?)',
            [tipo_documento, numero_documento, nombre_empleado, email_empleado, contrasena, id_cargo],
            callback
        );
    }
};

module.exports = User;
