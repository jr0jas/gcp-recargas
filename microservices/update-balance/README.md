# Microservicio Update Balance

## Descripción
Este microservicio se encarga de actualizar el saldo acumulado para un número telefónico específico en Firestore. Es parte de la plataforma de recargas telefónicas y está desplegado en Google Kubernetes Engine (GKE).

---

## Funcionalidad

- Expone un endpoint HTTP POST `/update` que recibe un JSON con:
  - `phone`: número telefónico (string)
  - `amount`: monto a sumar al saldo (número)
- Actualiza el saldo del usuario de forma atómica en Firestore usando `FieldValue.increment`.
- Crea el documento si no existe previamente.
- Retorna respuesta JSON con mensaje de éxito o error.

---

## Tecnologías

- Node.js (versión 18+)
- Express
- Google Cloud Firestore (modo nativo)
- Docker
- Kubernetes (GKE Autopilot)

---

## Endpoints

### POST `/update`

Ejemplo de cuerpo (JSON):

```json
{
  "phone": "83082688",
  "amount": 5000
}
