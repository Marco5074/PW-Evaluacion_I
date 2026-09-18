// Arreglo donde se guardan las incidencias
const incidencias = [];
// Contador para asignar un id único a cada incidencia
let siguienteID = 1;

const { validarPrioridad, campoVacio, normalizarEstado } = require('../utils/helper');

// Registro de incidencia
function registrarIncidencia(req, res) {
    const { empleado, area, descripcion, prioridad } = req.body;

    // Validación: todos los campos son obligatorios
    if (campoVacio(empleado) ||
        campoVacio(area) ||
        campoVacio(descripcion) ||
        campoVacio(prioridad)) {
        return res.status(400).json({ mensaje: 'todos los campos son obligatorios' });
    }

    if (!validarPrioridad(prioridad)) {
        return res.status(400).json({ mensaje: 'la prioridad debe ser alta, media o baja' });
    }

    // Guarda la prioridad normalizada en minúsculas
    const nuevaIncidencia = {
        id: siguienteID,
        empleado,
        area,
        descripcion,
        prioridad: prioridad.toLowerCase(),
        estado: 'Pendiente'
    };

    incidencias.push(nuevaIncidencia);
    siguienteID++;

    res.status(201).json({ mensaje: 'incidencia registrada correctamente' });
}

// Devuelve todas las incidencias guardadas
function listarIncidencias(req, res) {
    res.json(incidencias);
}

// Busca una incidencia por su id (usando validación booleana)
function buscarIncidencia(req, res) {
    const id = Number(req.params.id);

    const incidencia = incidencias.find(incidencia => incidencia.id === id);
    const existe = Boolean(incidencia);

    if (!existe) {
        return res.status(404).json({ mensaje: 'incidencia no encontrada' });
    }

    res.json(incidencia);
}

// Cambia el estado de una incidencia
function cambiarEstado(req, res) {
    const id = Number(req.params.id);
    const { estado } = req.body;

    const incidencia = incidencias.find(incidencia => incidencia.id === id);

    if (!incidencia) {
        return res.status(404).json({ mensaje: 'incidencia no encontrada' });
    }

    switch (normalizarEstado(estado)) {
        case 'pendiente':
            incidencia.estado = 'Pendiente';
            break;

        case 'enproceso':
            incidencia.estado = 'En Proceso';
            break;

        case 'resuelta':
            incidencia.estado = 'Resuelta';
            break;

        case 'cancelada':
            incidencia.estado = 'Cancelada';
            break;

        default:
            return res.status(400).json({
                mensaje: 'el estado debe ser Pendiente, En Proceso, Resuelta o Cancelada'
            });
    }

    res.json({
        mensaje: 'estado actualizado correctamente',
        incidencia
    });
}

// Eliminar incidencia
function eliminarIncidencia(req, res) {
    const id = Number(req.params.id);
    const index = incidencias.findIndex(incidencia => incidencia.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: 'incidencia no encontrada' });
    }

    incidencias.splice(index, 1);
    res.json({ mensaje: 'incidencia eliminada correctamente' });
}

// Estadísticas de las incidencias guardadas
function obtenerEstadisticas(req, res) {
    res.json({
        totalIncidencias: incidencias.length,
        pendientes: incidencias.filter(incidencia => normalizarEstado(incidencia.estado) === 'pendiente').length,
        enProceso: incidencias.filter(incidencia => normalizarEstado(incidencia.estado) === 'enproceso').length,
        resueltas: incidencias.filter(incidencia => normalizarEstado(incidencia.estado) === 'resuelta').length,
        canceladas: incidencias.filter(incidencia => normalizarEstado(incidencia.estado) === 'cancelada').length
    });
}

// Clasificar incidencias según su prioridad
function clasificarIncidencias(req, res) {
    const id = Number(req.params.id);
    const incidencia = incidencias.find(incidencia => incidencia.id === id);

    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    let clasificacion;

    // Como la prioridad se guarda en minúsculas en registrarIncidencia,
    // los 'case' deben compararse en minúsculas.
    switch (incidencia.prioridad) {
        case 'alta':
            clasificacion = 'Crítica';
            break;

        case 'media':
            clasificacion = 'Importante';
            break;

        case 'baja':
            clasificacion = 'Normal';
            break;

        default:
            return res.status(400).json({
                mensaje: 'La prioridad debe ser: Alta, Media o Baja'
            });
    }

    res.status(200).json({
        id: incidencia.id,
        clasificacion
    });
}

// Exportación única de los controladores
module.exports = {
    registrarIncidencia,
    listarIncidencias,
    buscarIncidencia,
    cambiarEstado,
    eliminarIncidencia,
    obtenerEstadisticas,
    clasificarIncidencias
};