const usuarioService = require('../services/userServices');//importar el servicio de usuario 

//objeto que contendra los metodos 
const usuarioController = {

    //metodo obtener los usuarios 
    getAllUsers: (req, res) => {//encarga de manejar la solicitud para obtener los usuarios
        usuarioService.getAllUsers((err, usuarios) => {// funcion call back llamado funcion del servicio 
            if (err) {//responde condigo 500 si hay un error
                res.status(500).json({ error: "Error al obtener los usuarios" });
                return;
            }
            res.json(usuarios);//responde con la lista de usuarios formato json
        });
    }
};

//exporta el objeto para ser utilizado en otros archivos 
module.exports = usuarioController;
