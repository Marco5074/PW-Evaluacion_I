# PW-Evaluacion_I
## DELETE `/incidencias/:id`

Elimina una incidencia por su id.

| | |
|---|---|
| **Método** | `DELETE` |
| **URL** | `http://localhost:3000/incidencias/:id` |
| **Body** | No lleva body |

**Parámetros**

- `id` (en la URL): número de la incidencia. Ejemplo: `/incidencias/1`

**Respuesta 200** — se eliminó:

```json
{
  "mensaje": "incidencia eliminada correctamente"
}
```

**Respuesta 404** — no existe ese id:

```json
{
  "mensaje": "incidencia no encontrada"
}
```

En Postman: método **DELETE**, URL `http://localhost:3000/incidencias/1`, Send. No uses GET en el navegador: eso busca la incidencia, no la borra.

---

## GET `/estadisticas`

Devuelve el total de incidencias y cuántas hay en cada estado.

| | |
|---|---|
| **Método** | `GET` |
| **URL** | `http://localhost:3000/estadisticas` |
| **Body** | No lleva body ni parámetros |

**Respuesta 200**

```json
{
  "totalIncidencias": 8,
  "pendientes": 4,
  "enProceso": 2,
  "resueltas": 1,
  "canceladas": 1
}
```

Los contadores salen del campo `estado` de cada incidencia (`Pendiente`, `En Proceso`, `Resuelta`, `Cancelada`). Las incidencias nuevas empiezan en `Pendiente`. Si el arreglo está vacío, todos los números van en `0`.