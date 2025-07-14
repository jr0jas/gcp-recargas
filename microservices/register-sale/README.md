# 📦 Microservicio: Registro de Recargas

Este microservicio está diseñado para ejecutarse en Google Kubernetes Engine (GKE) y registrar las recargas recibidas en Firestore.

## 🚀 Endpoints

- `POST /register`: Registra una nueva recarga en Firestore.

### 📥 Ejemplo de Payload

```json
{
  "phone": "83082688",
  "amount": 2000
}
```

## 🐳 Docker

Para correrlo localmente con Docker:

```bash
docker build -t register-sale .
docker run -p 8080:8080 register-sale
```

## ☁️ Despliegue en GKE

1. Crear el cluster en GKE Autopilot:

```bash
gcloud container clusters create-auto gcp-recargas-cluster \
  --region=us-central1
```

2. Habilitar Firestore y configurar permisos (Workload Identity si se desea seguridad entre servicios).

3. Crear el Deployment y Service con YAML (ejemplo en `k8s/deployment.yaml`).

## 🔐 Notas

- Utiliza Firestore en modo **nativo**.
- Será invocado desde `processRecharge` vía HTTP.
- Expón este microservicio con un Ingress para que otros servicios lo puedan consumir.

## 📌 Tecnologías

- Node.js + Express
- Firestore
- Docker
- GKE Autopilot
