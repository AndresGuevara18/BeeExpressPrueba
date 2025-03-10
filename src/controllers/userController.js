const usuarioService = require('../services/userServices'); // Importar el servicio de usuario

const usuarioController = {
    //todos los usuarios
    getAllUsers: (req, res) => {
        usuarioService.getAllUsers((err, usuarios) => {
            if (err) {
                res.status(500).json({ error: "Error al obtener los usuarios" });
                return;
            }
            res.json(usuarios);
        });
    },

    // nuevo usuario
    createUser: async (req, res) => {
        try {
            const usuarioData = req.body;
            const fotoBuffer = req.file ? req.file.buffer : null;

            const nuevoUsuario = await usuarioService.createUser(usuarioData, fotoBuffer);

            res.status(201).json({
                message: "Imagen Usuario creado exitosamente.",
                usuario: nuevoUsuario
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },


    //ELIMINAR USAURIO
    deleteUser: async (req, res) =>{
        try {
            const {id_usuario} = req.params; //Extraer el  ID desde la url
            const resultado = await usuarioService.deleteUser(id_usuario); //llamado servicio

            if (!resultado) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            res.json({ message: "✅ Usuario eliminado correctamente" });

        } catch (error) {
            console.error("❌Error en deleteUser:", error);
            res.status(500).json({ error: "❌Error al eliminar el usuario" }); // Manejo de errores
        }
    }
};

module.exports = usuarioController;
