# submit-recharge (Cloud Run)

Servicio en Node.js que expone un endpoint `/procesarRecarga` y publica el payload en un tópico de Pub/Sub.

## Variables de entorno necesarias

- `TOPIC_NAME`: nombre del tópico Pub/Sub (ej. `recargas-topic`)

## Despliegue

```bash
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/submit-recharge
gcloud run deploy submit-recharge \
  --image gcr.io/YOUR_PROJECT_ID/submit-recharge \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars=TOPIC_NAME=recargas-topic
```
