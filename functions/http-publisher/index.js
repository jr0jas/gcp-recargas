const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();

exports.publishRecharge = async (req, res) => {
  // 👇 Agrega soporte para CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // 👇 Responde a solicitudes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  // Verifica método
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { numero, monto } = req.body;

  if (!numero || !monto) {
    return res.status(400).send('Número y monto son requeridos');
  }

  try {
    const data = Buffer.from(JSON.stringify({ phone: numero, amount: monto }));
    await pubsub.topic('recargas-topic').publish(data);

    console.log('✅ Publicado en recargas-topic');
    res.status(200).send('Mensaje publicado en Pub/Sub');
  } catch (err) {
    console.error('❌ Error al publicar en Pub/Sub:', err);
    res.status(500).send('Error al publicar en Pub/Sub');
  }
};
