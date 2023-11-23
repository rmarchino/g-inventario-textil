const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const apiRoutes = require('./routes');
const errorRoutes = require('./routes/errors.routes');
require("dotenv").config();

// Creamos la instancia
const app = express();
app.use(cors());
app.use(morgan("tiny"));

app.use(express.json());

const PORT = process.env.PORT ?? 8000;

app.get("/", (req, res) => {
    res.send("Bienvenido a mi servidor");
})

// Agrupar todas las rutas
apiRoutes(app)

// Agrupar todo los manejador de errores
errorRoutes(app);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})