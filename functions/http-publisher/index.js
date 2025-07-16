// functions/http-publisher/index.js
const { PubSub } = require('@google-cloud/pubsub');
const { HttpFunction } = require('@google-cloud/functions-framework');
const pubsub = new PubSub();
const TOPIC = 'recharge-topic';

exports.publishRecharge = async (req, res) => {
  if (req.method !== 'POST') {
    res.set('Allow', 'POST');
    return res.status(405).send('Método no permitido: use POST');
  }

  const { numero: phone, monto } = req.body;
  if (!phone || monto === undefined) {
    return res.status(400).json({ error: 'Faltan campos "numero" o "monto"' });
  }

  const amount = Number(monto);
  if (isNaN(amount)) {
    return res.status(400).json({ error: '"monto" debe ser un número' });
  }

  try {
    const messageId = await pubsub
      .topic(TOPIC)
      .publish(Buffer.from(JSON.stringify({ phone, amount })));
    console.log(`📨 Publicado en Pub/Sub [ID=${messageId}]: ${phone} + ₡${amount}`);
    res.status(200).json({ message: 'Recarga enviada a procesamiento', messageId });
  } catch (err) {
    console.error('❌ Error publicando en Pub/Sub:', err);
    res.status(500).json({ error: 'Error interno al publicar en Pub/Sub' });
  }
};

// Registra la función con Functions Framework para que escuche HTTP
HttpFunction.http('publishRecharge', exports.publishRecharge);
