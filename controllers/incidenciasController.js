//arreglo donde se guardan las incidencias
const incidencias = [];
//contador para asignar un id unico a cada incidencia
let siguienteID = 1;

//registro de incidencia
function registrarIncidencia(req, res) {
    const { empleado, area, descripcion, prioridad } = req.body;

    //validacion 1. todos los campos son obligatorios y no pueden venir vacios.
    //trim() quita los espacios en blanco, para que " " no cuente como dato valido
    if (!empleado || empleado.trim() === '' ||
        !area || area.trim() === '' ||
        !descripcion || descripcion.trim() === '' ||
        !prioridad || prioridad.trim() === '') {
        return res.status(400).json({ mensaje: 'todos los campos son obligatorios' });
    }

    //validacion 2.la prioridad solo puede ser esas 3 si es diferente da error
    //y .tolowercase() evita el problema si es en mayuscula o minuscula.
    const prioridadValida = ['alta', 'media', 'baja'].includes(prioridad.toLowerCase());

    if (!prioridadValida) {
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
function listarIncidencias(req,res){
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

//listar incidencias
//se exporta la funcion para routes/incidencias.js la pueda usar
module.exports = {
    registrarIncidencia,
    listarIncidencias,
    buscarIncidencia
};
