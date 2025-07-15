````markdown
# 📤 publishRecharge

Esta función HTTP de Google Cloud Functions expone un endpoint `POST` que recibe solicitudes de recarga desde el frontend y orquesta el procesamiento llamando a dos microservicios desplegados en GKE:

- Microservicio de Registro de Venta (`/register`)
- Microservicio de Actualización de Saldo (`/update-balance`)

## 🚀 Funcionalidad

Al recibir una solicitud `POST` con un JSON que contiene `numero` y `monto`:

- Valida el método HTTP y los datos recibidos.
- Llama al microservicio de registro de venta para almacenar la recarga.
- Llama al microservicio de actualización de saldo para modificar el saldo actual.
- Devuelve un mensaje combinado indicando el estado de ambas operaciones.

## 🌐 CORS

- Permite cualquier origen (`Access-Control-Allow-Origin: *`).
- Maneja preflight `OPTIONS` respondiendo con `204 No Content`.

## 📥 Estructura esperada del body

```json
{
  "numero": "83082688",
  "monto": 5000
}
````

## ⚙️ Despliegue

Ejemplo de comando para desplegar la función:

```bash
gcloud functions deploy publishRecharge \
  --runtime nodejs18 \
  --region=us-central1 \
  --trigger-http \
  --allow-unauthenticated \
  --source=. \
  --entry-point=publishRecharge
```

## 🧪 Pruebas

### Con `curl`

```bash
curl -X POST https://REGION-PROYECTO.cloudfunctions.net/publishRecharge \
  -H "Content-Type: application/json" \
  -d '{"numero":"83082688", "monto":5000}'
```

Reemplaza `REGION-PROYECTO` por la URL real de tu función.

### Desde el frontend

El formulario puede llamar esta función usando `fetch()` con un `POST`:

```javascript
fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ numero, monto })
});
```

## 📌 Notas

* Esta función actúa como orquestador, desacoplando el frontend del backend.
* Proporciona retroalimentación detallada según el éxito o fallo de cada microservicio.
* Maneja correctamente errores y devuelve códigos HTTP adecuados.
* Mantén actualizadas las URLs de los microservicios (`REGISTER_SERVICE_URL` y `UPDATE_SERVICE_URL`) en el código.

```
```
