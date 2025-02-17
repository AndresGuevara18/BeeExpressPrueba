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
const express = require('express');
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
});