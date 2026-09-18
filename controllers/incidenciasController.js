//arreglo donde se guardan las incidencias
const incidencias = [];
//contador para asignar un id unico a cada incidencia
let siguienteID = 1;

const{validarPrioridad,campoVacio,normalizarEstado}= require('../utils/helper');

//registro de incidencia
function registrarIncidencia(req, res) {
    const { empleado, area, descripcion, prioridad } = req.body;

    //validacion 1. todos los campos son obligatorios y no pueden venir vacios.
    //trim() quita los espacios en blanco, para que " " no cuente como dato valido
    if (campoVacio(empleado) ||
        campoVacio(area)||
        campoVacio(descripcion) ||
        campoVacio(prioridad)) {
        return res.status(400).json({ mensaje: 'todos los campos son obligatorios' });
    }

    
    if (!validarPrioridad(prioridad)) {
        return res.status(400).json({ mensaje: 'la prioridad debe ser alta, media o baja' });
    }

    //si pasa las dos validaciones se arma el objeto completo de la incidencia
    const nuevaIncidencia = { id: siguienteID, empleado, area, descripcion, prioridad, estado: 'Pendiente' }; //toda incidencia nueva inicia como pendiente

    //se agrega una nueva incidencia al arreglo
    incidencias.push(nuevaIncidencia);
    siguienteID++;

    //mensaje de confirmacion que se guardo bien
    res.status(201).json({ mensaje: 'incidencia registrada correctamente' });
}

// devuelve todas las incidencias guardadas hasta el momento, en formato JSON
function listarIncidencias(req, res) {
    res.json(incidencias);
}

// busca una incidencia por su id
function buscarIncidencia(req, res) {
    const id = Number(req.params.id);

    // busca dentro del arreglo la incidencia que tenga el id solicitado
    const incidencia = incidencias.find(incidencia => incidencia.id === id);

    // si no encuentra la incidencia, devuelve error 404
    if (!incidencia) {
        return res.status(404).json({
            mensaje: 'incidencia no encontrada'
        });
    }
    // si encuentra la incidencia, devuelve la incidencia 
    res.json(incidencia);
}

// cambia el estado de una incidencia
function cambiarEstado(req, res) {
    const id = Number(req.params.id);
    const { estado } = req.body;

    // busca la incidencia por su id
    const incidencia = incidencias.find(incidencia => incidencia.id === id);

    // verifica si la incidencia existe
    if (!incidencia) {
        return res.status(404).json({
            mensaje: 'incidencia no encontrada'
        });
    }

    // valida el estado utilizando switch
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

    // devuelve mensaje de confirmacion
    res.json({
        mensaje: 'estado actualizado correctamente',
        incidencia
    });
}


//eliminar incidencia
function eliminarIncidencia(req, res) {
    const id = Number(req.params.id);
    const index = incidencias.findIndex(incidencia => incidencia.id === id);
    if (index === -1) {
        return res.status(404).json({ mensaje: 'incidencia no encontrada' });
    }
    incidencias.splice(index, 1);
    res.json({ mensaje: 'incidencia eliminada correctamente' });
}

// estadisticas de las incidencias guardadas
function obtenerEstadisticas(req, res) {


    res.json({
        totalIncidencias: incidencias.length,
        pendientes: incidencias.filter(incidencia => normalizarEstado(incidencia.estado) === 'pendiente').length,
        enProceso: incidencias.filter(incidencia => normalizarEstado(incidencia.estado) === 'enproceso').length,
        resueltas: incidencias.filter(incidencia => normalizarEstado(incidencia.estado) === 'resuelta').length,
        canceladas: incidencias.filter(incidencia => normalizarEstado(incidencia.estado) === 'cancelada').length
    });
}

function clasificarIncidencias(req, res) {
    const id = Number(req.params.id);
    const incidencia = incidencias.find(incidencia => incidencia.id === id);

    if (!incidencia) {
        return res.status(404).json({
            mensaje: "Incidencia no encontrada"
        });
    }

    let clasificacion;
    switch (incidencia.prioridad.toLowerCase()) {
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
                mensaje: 'La prioridad debe ser: Alta, Media, Baja'
            });
    }

    res.status(200).json({
        id: incidencia.id,
        clasificacion
    });
}



//se exporta la funcion para routes/incidencias.js la pueda usar
module.exports = {
    registrarIncidencia,
    listarIncidencias,
    buscarIncidencia,
    cambiarEstado,
    eliminarIncidencia,
    obtenerEstadisticas,
    clasificarIncidencias
};