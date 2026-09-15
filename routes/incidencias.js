const express = require('express')
const router = express.Router();
const incidenciasController = require('../controllers/incidenciasController');

//cuando llegue una peticion post a /incidencias
//se ejecuta la funcion registrarIncidencia del contrlador
router.post('/incidencias', incidenciasController.registrarIncidencia);

//se hace lo mismo se exporta para para que app.js lo pueda usar
module.exports = router;