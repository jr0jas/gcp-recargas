````markdown
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
