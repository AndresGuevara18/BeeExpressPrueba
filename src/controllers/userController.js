const usuarioService = require('../services/userServices');

const usuarioController = {
    getAllUsers: (req, res) => {
        usuarioService.getAllUsers((err, usuarios) => {
            if (err) {
                res.status(500).json({ error: "Error al obtener los usuarios" });
                return;
            }
            res.json(usuarios);
        });
    }
};

module.exports = usuarioController;
