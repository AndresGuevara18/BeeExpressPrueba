const db = require('../config/database'); // Importa la conexión a la base de datos
const Cargo = require('../models/cargoModel'); // Importa el modelo Cargo

const cargoService = {
    // Obtener todos los cargos
    getAllCargos: async () => {
        const query = 'SELECT * FROM cargo'; // Consulta SQL
        try {
            const [results] = await db.promise().query(query); // Ejecutamos la consulta con promesas
            return results.map(row => new Cargo(row.id_cargo, row.nombre_cargo, row.descripcion)); 
            // Converti cada fila del resultado en una instancia de Cargo
        } catch (err) {
            throw err; // error,lo maneje el controlador
        }
    },

    // Obtener un cargo por ID
    getCargoById: async (id_cargo) => {
        const query = 'SELECT * FROM cargo WHERE id_cargo = ?'; // Consulta SQL
        try {
            const [results] = await db.promise().query(query, [id_cargo]); // Ejecuta consulta con el ID como parámetro

            if (results.length === 0) return null; // Si no se encuentra
            
            //obtiene los valores de esa fila.
            return new Cargo(results[0].id_cargo, results[0].nombre_cargo, results[0].descripcion);
o
        } catch (err) {
            throw err; // Propagamos el error para que lo maneje el controlador
        }
    },

   // Crear 
   createCargo: async (cargoData) => {
    const query = 'INSERT INTO cargo (nombre_cargo, descripcion) VALUES (?, ?)'; //consulta
    try {
        // Insertar valores usando los getters
        const [result] = await db.promise().query(query, [cargoData.getNombreCargo(), cargoData.getDescripcion()]);
        // Crea un nuevo objeto con el ID generado
        return new Cargo(result.insertId, cargoData.getNombreCargo(), cargoData.getDescripcion());
  
    } catch (err) {
        throw err; // error
    }
    },

    //actualizar
    updateCargo: async (id_cargo, nombre_cargo, descripcion) => {
        const query = `UPDATE cargo SET nombre_cargo = ?, descripcion = ? WHERE id_cargo = ?`;//consulta sql
        
        try {
            const [result] = await db.promise().query(query, [nombre_cargo, descripcion, id_cargo]);
            return result; // Retorna el resultado de la consulta
        } catch (err) {
            console.error("❌ Error en updateCargo (Service):", err);
            throw err;
        }
    },

    deleteCargo: async (id_cargo) => {
        try {
            // Verificar si hay usuarios con este cargo
            const [usuarios] = await db.promise().query('SELECT id_usuario FROM usuario WHERE id_cargo = ?', [id_cargo]);
    
            if (usuarios.length > 0) {
                return { error: "⚠️ No se puede eliminar porque hay usuarios asignados el cargo." };
            }
    
            // 2️⃣ Si no hay usuarios, proceder a eliminar el cargo
            const [result] = await db.promise().query('DELETE FROM cargo WHERE id_cargo = ?', [id_cargo]);
            
            if (result.affectedRows === 0) return null; // El cargo no existe
            
    
            return { message: "✅ Cargo eliminado correctamente" }; // Mensaje de éxito
        } catch (err) {
            console.error("❌ Error en deleteCargo:", err);
            throw err; // Lanza el error para que el controlador lo maneje
        }
    }


};

// Exporta el servicio para que pueda ser utilizado en otros archivos
module.exports = cargoService;
