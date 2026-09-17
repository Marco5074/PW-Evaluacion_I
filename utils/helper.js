
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

