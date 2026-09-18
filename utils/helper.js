function validarPrioridad(prioridad)
{
    return typeof prioridad === 'string' &&
           ['alta', 'media', 'baja'].includes(prioridad.toLowerCase());
}

function campoVacio(valor)
{
    return typeof valor !== 'string' || valor.trim() === '';
}

//funcion de normalizar estado
function normalizarEstado(estado)
{
    if (typeof estado !== 'string') {
        return '';
    }

    return estado.toLowerCase().replace(/\s+/g, '');
}

module.exports = {
    validarPrioridad,
    campoVacio,
    normalizarEstado
};