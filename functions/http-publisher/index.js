const fetch = require('node-fetch'); // asegúrate de tener esta dependencia en package.json

const REGISTER_SERVICE_URL = 'http://34.8.91.19/register'; // IP pública de tu Ingress

exports.publishRecharge = async (req, res) => {
  // CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { numero, monto } = req.body;

  if (!numero || !monto) {
    return res.status(400).send('Número y monto son requeridos');
  }

  try {
    const response = await fetch(REGISTER_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: numero, amount: monto }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Error del microservicio:', text);
      return res.status(502).send('Error al registrar la recarga');
    }

    const result = await response.json();
    console.log('✅ Recarga enviada al microservicio:', result);
    res.status(200).send('Recarga enviada correctamente');
  } catch (error) {
    console.error('❌ Error en publishRecharge:', error);
    res.status(500).send('Error interno al procesar la recarga');
  }
};
