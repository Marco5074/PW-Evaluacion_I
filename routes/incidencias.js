const express = require('express')
const router = express.Router();
const incidenciasController = require('../controllers/incidenciasController');

//cuando llegue una peticion post a /incidencias
//se ejecuta la funcion registrarIncidencia del contrlador
router.post('/incidencias', incidenciasController.registrarIncidencia);

//cuando llegue una peticion GET a incidencias, se ejecuta la funcion listarIncidencias del controlador
router.get('/incidencias',incidenciasController.listarIncidencias);

// cuando llegue una peticion GET a /incidencias/:id
// se ejecuta la funcion buscarIncidencia del controlador
router.get('/incidencias/:id', incidenciasController.buscarIncidencia);

// cuando llegue una peticion PATCH a /incidencias/:id/estado
// se ejecuta la funcion cambiarEstado del controlador
router.patch('/incidencias/:id/estado', incidenciasController.cambiarEstado);

// eliminar incidencia
router.delete('/incidencias/:id', incidenciasController.eliminarIncidencia);

// cuando llegue una peticion GET a /estadisticas
// se ejecuta la funcion obtenerEstadisticas del controlador
router.get('/estadisticas', incidenciasController.obtenerEstadisticas);

// Clasifica una incidencia según su prioridad, usando su ID
router.get('/incidencias/:id/clasificacion', incidenciasController.clasificarIncidencias);

//se hace lo mismo se exporta para para que app.js lo pueda usar
module.exports = router;