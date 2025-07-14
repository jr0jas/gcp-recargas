# 📤 publish-recharge

Esta función HTTP de Google Cloud Functions expone un endpoint `POST` que recibe solicitudes de recarga desde el frontend y publica los datos (número telefónico y monto) en el tópico `recargas-topic` de Pub/Sub para ser procesados de manera asíncrona.

## 🚀 Funcionalidad

Cuando se envía un formulario desde el frontend:

- Se realiza una solicitud `POST` con un JSON que contiene `numero` y `monto`.
- La función valida el método y los datos.
- Publica el mensaje en el tópico `recargas-topic` de Pub/Sub.
- Devuelve una respuesta indicando si la operación fue exitosa.

## 🌐 CORS

Esta función maneja CORS para permitir llamadas desde el navegador:

- Permite cualquier origen (`Access-Control-Allow-Origin: *`).
- Maneja preflight `OPTIONS` respondiendo con `204 No Content`.

## 📥 Estructura esperada del body

```json
{
  "numero": "83082688",
  "monto": 5000
}
```

## ⚙️ Despliegue

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

Puedes probar la función desde el navegador o con `curl`:

### Con `curl`

```bash
curl -X POST https://REGION-PROJECT.cloudfunctions.net/publishRecharge \
  -H "Content-Type: application/json" \
  -d '{"numero":"83082688", "monto":5000}'
```

Reemplaza `REGION-PROJECT` con tu URL real.

### Desde el frontend

El formulario puede llamar esta función usando `fetch()` con un `POST` como en este ejemplo:

```javascript
fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ numero, monto })
});
```

## 📌 Notas

- Esta función es la puerta de entrada del sistema: desacopla el frontend del backend usando Pub/Sub.
- La validación básica se realiza en esta etapa.
- No almacena datos, sólo los publica para que sean procesados posteriormente por otra función.

