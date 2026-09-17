const express = require('express');
const app = express();

app.use(express.json());

//se exporta la rutas relacionadas a incidencias
const incidenciasRoutes = require('./routes/incidencias');
app.use('/',incidenciasRoutes);

//se levanta el servidor al puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});