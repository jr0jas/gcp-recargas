````markdown
# HTTP Publisher

Esta Cloud Function expone un endpoint HTTP que recibe número de teléfono y monto, y publica un mensaje en un tópico de Pub/Sub para su posterior procesamiento.

## Estructura

- `index.js` – Lógica de la función `publishRecharge`
- `package.json` – Dependencias (`@google-cloud/pubsub`)

## Variables a configurar

- `TOPIC` en `index.js`: nombre del tópico de Pub/Sub (por defecto `recharge-topic`).

## Instalación

```bash
cd functions/http-publisher
npm install
````

## Despliegue

```bash
gcloud functions deploy publishRecharge \
  --runtime nodejs18 \
  --trigger-http \
  --allow-unauthenticated \
  --region us-central1
```

Al terminar, anota la URL que te regrese GCP para usarla en el front-end.

## Uso desde el front-end

Envía un POST a la URL con JSON:

```json
{
  "numero": "8881234567",
  "monto": 5000
}
```

Recibirás una respuesta 200 con el `messageId` de Pub/Sub.

````

```markdown
# Process Recharge

Esta Cloud Function está suscrita al tópico de Pub/Sub (`recharge-topic`). Cada vez que se publica un mensaje, la función:

1. Parsea `{ phone, amount }` del mensaje.  
2. Llama al microservicio de registro (`/register`).  
3. Llama al microservicio de actualización de saldo (`/update-balance`).

## Estructura

- `index.js` – Lógica de la función `processRecharge`
- `package.json` – Dependencias (`node-fetch`)

## Variables a configurar

- `REGISTER_SERVICE_URL` en `index.js`: URL de tu microservicio de registro.
- `UPDATE_BALANCE_URL` en `index.js`: URL de tu microservicio de saldo.

## Instalación

```bash
cd functions/process-recharge
npm install
````

## Despliegue

```bash
gcloud functions deploy processRecharge \
  --runtime nodejs18 \
  --trigger-topic recharge-topic \
  --region us-central1
```

## Logs y monitoreo

* En la consola de Cloud Functions, revisa los logs para ver:

  * 📲 Inicio de procesamiento
  * ✅/❌ llamados a cada microservicio

```
```
