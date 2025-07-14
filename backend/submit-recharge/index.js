const express = require('express');
const { PubSub } = require('@google-cloud/pubsub');
const app = express();
const pubsub = new PubSub();
const topic = process.env.TOPIC_NAME;

app.use(express.json());

app.post('/procesarRecarga', async (req, res) => {
  const { telefono, monto } = req.body;

  if (!telefono || !monto) {
    return res.status(400).send('Faltan datos');
  }

  const mensaje = JSON.stringify({ telefono, monto });

  try {
    await pubsub.topic(topic).publish(Buffer.from(mensaje));
    res.status(200).send('Recarga publicada correctamente');
  } catch (error) {
    console.error('Error al publicar en Pub/Sub:', error);
    res.status(500).send('Error interno');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));
