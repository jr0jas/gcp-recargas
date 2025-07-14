# 📦 process-recharge

Esta función de Google Cloud Functions se suscribe al tópico `recargas-topic` de Pub/Sub. Su propósito es procesar de forma asíncrona los eventos de recarga enviados desde el frontend de la plataforma.

## 🚀 Funcionalidad

Cuando se publica un mensaje en el tópico `recargas-topic` (por ejemplo, número telefónico y monto), esta función:

- Lee el mensaje.
- Lo decodifica desde base64.
- Extrae los campos `phone` y `amount`.
- Registra un log con la información de la recarga.
- Posteriormente (en el paso 3 del examen), esta función podrá invocar un microservicio en GKE para almacenar la transacción.

## 📥 Estructura del mensaje esperado

```json
{
  "phone": "83082688",
  "amount": 5000
}
```

## ⚙️ Despliegue

Ejecutar en Cloud Shell:

```bash
gcloud functions deploy processRecharge \
  --runtime nodejs18 \
  --trigger-topic recargas-topic \
  --region=us-central1 \
  --source=. \
  --entry-point=processRecharge
```

## 🧪 Verificación

Para probar esta función, puedes publicar un mensaje al tópico manualmente:

```bash
gcloud pubsub topics publish recargas-topic \
  --message='{"phone": "83082688", "amount": 5000}'
```

Luego consulta los logs:

```bash
gcloud functions logs read processRecharge --region=us-central1
```

## 📌 Notas

* No requiere CORS porque es una función suscriptora de Pub/Sub, no expuesta vía HTTP.
* A futuro, esta función llamará al microservicio de registro de venta en GKE mediante una solicitud HTTP segura.
