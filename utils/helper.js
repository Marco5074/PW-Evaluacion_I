
//PrioridadValida 

function validarPrioridad(prioridad)
{
    return ['alta' , 'media' , 'baja'].includes(prioridad.toLowerCase()); 
}

function campoVacio(valor)
{
    return !valor || valor.trim() === ''; 
}
//prueba

//funcion de normalizar estado
function normalizarEstado(estado){
    return(estado || '').toLowerCase().replace(/\s+/g,'');
}

