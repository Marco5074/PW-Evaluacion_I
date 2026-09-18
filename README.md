# PW-Evaluacion_I
**Integrantes**
Leila Saraí Campos Peraza 00141525<br>
Marcos Noe Vasquez Guardado 00114825<br>
Ulises Nahonri Martinez Martinez 00191323<br>
Gabriela Michelle Navas Quinteros 00167525<br>

## POST `/incidencias`

Registra una nueva incidencia.

| | |
|---|---|
| **Método** | `POST` |
| **URL** | `http://localhost:3000/incidencias` |
| **Body** | Lleva body en formato JSON |

**Body**

Todos los campos son obligatorios:

```json
{
  "empleado": "Juan",
  "area": "Informatica",
  "descripcion": "No puedo acceder al sistema",
  "prioridad": "alta"
} 
```
La prioridad solamente puede ser:<br>
-Alta<br>
-Media<br>
-Baja<br>
Las incidencias nuevas comienzan automáticamente con el estado Pendiente.

Respuesta 201
```json

{
  "mensaje": "incidencia registrada correctamente"
}
```

Respuesta 400 — Si falta algún campo:
```json

{
  "mensaje": "todos los campos son obligatorios"
}
```
Si la prioridad no es válida:

```json
{
  "mensaje": "la prioridad debe ser alta, media o baja"
}
```
## GET `/incidencias`
Devuelve todas las incidencias registradas.
|            |                                     |
| ---------- | ----------------------------------- |
| **Método** | `GET`                               |
| **URL**    | `http://localhost:3000/incidencias` |
| **Body**   | No lleva body ni parámetros         |

**Respuesta 200**
```json
[
  {
    "id": 1,
    "empleado": "Juan",
    "area": "Informatica",
    "descripcion": "No puedo acceder al sistema",
    "prioridad": "alta",
    "estado": "Pendiente"
  },
  {
    "id": 2,
    "empleado": "Carlos",
    "area": "Recursos Humanos",
    "descripcion": "No funciona la impresora",
    "prioridad": "media",
    "estado": "Pendiente"
  }
]
```
Si no existen incidencias:
```json
[]
```
## GET `/incidencias/:id`
Busca una incidencia específica utilizando su id.
|            |                                         |
| ---------- | --------------------------------------- |
| **Método** | `GET`                                   |
| **URL**    | `http://localhost:3000/incidencias/:id` |
| **Body**   | No lleva body                           |

**Parámetros**
id: número de la incidencia que se desea buscar.

Ejemplo:
http://localhost:3000/incidencias/1

**Respuesta 200**
```json

{
  "id": 1,
  "empleado": "Michelle",
  "area": "Informatica",
  "descripcion": "No puedo acceder al sistema",
  "prioridad": "alta",
  "estado": "Pendiente"
}
```
**Respuesta 404**
```json
{
  "mensaje": "incidencia no encontrada"
}
```

## PUT `/incidencias/:id/estado`
Cambia el estado de una incidencia existente.
|            |                                                |
| ---------- | ---------------------------------------------- |
| **Método** | `PUT`                                          |
| **URL**    | `http://localhost:3000/incidencias/:id/estado` |
| **Body**   | Lleva body en formato JSON                     |

**Parámetros**
id: número de la incidencia que se desea actualizar.

Ejemplo:
http://localhost:3000/incidencias/1/estado

Estados permitidos

El estado solamente puede ser: <br>
Pendiente <br>
En proceso <br>
Resuelta<br>

**Body**
```json

{
  "estado": "En proceso"
}
```
**Respuesta 200**
```json
{
  "mensaje": "estado actualizado correctamente",
  "incidencia": {
    "id": 1,
    "empleado": "Michelle",
    "area": "Informatica",
    "descripcion": "No puedo acceder al sistema",
    "prioridad": "alta",
    "estado": "En proceso"
  }
}
```
**Respuesta 400** — Si el estado no es válido:
```json
{
  "mensaje": "el estado debe ser Pendiente, En proceso o Resuelta"
}
```
**Respuesta 404** — Si no existe la incidencia:
```json
{
  "mensaje": "incidencia no encontrada"
}
```
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

## GET `/incidencias/id:/clasificacion`
Clasifica una incidencia según su prioridad.
|            |                                                       |
| ---------- | ----------------------------------------------------- |
| **Método** | `GET`                                                 |
| **URL**    | `http://localhost:3000/incidencias/:id/clasificacion` |
| **Body**   | No lleva body                                         |

**Parámetros**
id: número de la incidencia que se desea clasificar.

Ejemplo:
http://localhost:3000/incidencias/1/clasificacion

**Clasificacion**
| Prioridad | Clasificación |
| --------- | ------------- |
| `alta`    | `Crítica`     |
| `media`   | `Importante`  |
| `baja`    | `Normal`      |

**Respuesta 200**
```json
{
  "id": 1,
  "clasificacion": "Crítica"
}
```
**Respuesta 404**
```json
{
  "mensaje": "Incidencia no encontrada"
}
```
## Resumen de rutas
| Método   | URL                              | Función                                      |
| -------- | -------------------------------- | -------------------------------------------- |
| `POST`   | `/incidencias`                   | Registrar una incidencia                     |
| `GET`    | `/incidencias`                   | Listar todas las incidencias                 |
| `GET`    | `/incidencias/:id`               | Buscar una incidencia por id                 |
| `PUT`    | `/incidencias/:id/estado`        | Cambiar el estado de una incidencia          |
| `DELETE` | `/incidencias/:id`               | Eliminar una incidencia                      |
| `GET`    | `/estadisticas`                  | Ver estadísticas de las incidencias          |
| `GET`    | `/incidencias/:id/clasificacion` | Clasificar una incidencia según su prioridad |

