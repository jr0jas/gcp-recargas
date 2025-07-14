# Plataforma de Recargas Telefónicas (GCP Serverless)

Implementación de una arquitectura event-driven y desacoplada en GCP basada en:

- Cloud Run
- Pub/Sub
- Cloud Functions
- GKE Autopilot
- Firestore

## Componentes

- `backend/submit-recharge`: Recibe las recargas y las publica en Pub/Sub

## Cómo empezar

1. Clona el repo
2. Despliega `submit-recharge` a Cloud Run
3. Continúa con `functions/process-recharge` y microservicios GKE
