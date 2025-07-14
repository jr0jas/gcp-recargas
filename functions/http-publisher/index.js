const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();

exports.publishRecharge = async (req, res) => {
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
