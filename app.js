/*const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) =>{
    const read = fs.createReadStream('./index.html')
    read.pipe(res)
})

server.listen(3000)
console.log('server in port $(3000)')*/

/*const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.sendFile('./index.html', {
        root: __dirname
    })
})

app.listen(3000)*/



const express = require('express'); // Importa Express
const path = require('path'); // Manejo de rutas de archivos
const usuarioRoutes = require('./src/routes/userRoutes'); // Importa rutas de usuario

const app = express(); // Instancia de Express
const PORT = 3000; // Define el puerto

// Middleware para analizar JSON
app.use(express.json());

//Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de API
app.use('/api', usuarioRoutes);

// Ruta principal - Servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});


/*/const express = require('express');
const db = require('./src/config/database');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

app.use(express.json());  // Para manejar JSON
app.use('/api', userRoutes);  // Rutas de usuario

app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: __dirname });
});

app.listen(3000, () => {
    console.log('Server on port 3000');
});*/