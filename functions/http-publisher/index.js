const fetch = require('node-fetch'); // Dependencia para hacer llamadas HTTP

// URLs públicas de los microservicios expuestos vía Ingress
const REGISTER_SERVICE_URL = 'http://34.8.91.19/register';
const UPDATE_BALANCE_URL = 'http://34.117.118.60/update-balance';

exports.publishRecharge = async (req, res) => {
  // Configuraciones CORS para permitir peticiones desde cualquier origen
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Responder preflight OPTIONS para CORS
  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Extraer datos del body JSON
  const { numero, monto } = req.body;

  // Validar campos requeridos
  if (!numero || !monto) {
    return res.status(400).send('Número y monto son requeridos');
  }

  // Flags para controlar resultados de ambos microservicios
  let registerSuccess = false;
  let updateSuccess = false;

  try {
    // Llamar microservicio de registro de venta
    const registerResponse = await fetch(REGISTER_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: numero, amount: monto }),
    });

    if (registerResponse.ok) {
      registerSuccess = true;
      console.log('✅ Recarga registrada correctamente en el microservicio de registro');
    } else {
      const errorText = await registerResponse.text();
      console.error('❌ Error en microservicio de registro:', errorText);
    }
  } catch (error) {
    console.error('❌ Falló llamada al microservicio de registro:', error);
  }

  try {
    // Llamar microservicio de actualización de saldo
    const updateResponse = await fetch(UPDATE_BALANCE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: numero, amount: monto }),
    });

    if (updateResponse.ok) {
      updateSuccess = true;
      console.log('✅ Saldo actualizado correctamente en el microservicio de saldo');
    } else {
      const errorText = await updateResponse.text();
      console.error('❌ Error en microservicio de saldo:', errorText);
    }
  } catch (error) {
    console.error('❌ Falló llamada al microservicio de saldo:', error);
  }

  // Responder según resultado de ambas llamadas
  if (registerSuccess && updateSuccess) {
    return res.status(200).send('Recarga registrada y saldo actualizado exitosamente');
  } else if (registerSuccess) {
    return res.status(206).send('Recarga registrada, pero fallo actualización de saldo');
  } else if (updateSuccess) {
    return res.status(206).send('Saldo actualizado, pero fallo registro de recarga');
  } else {
    return res.status(502).send('Fallaron ambos microservicios');
  }
};
