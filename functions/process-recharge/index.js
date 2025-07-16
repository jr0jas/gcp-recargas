// functions/process-recharge/index.js
const fetch = require('node-fetch');

// Cambia por tus endpoints reales (https si corresponde)
const REGISTER_SERVICE_URL = 'http://34.8.91.19/register';
const UPDATE_BALANCE_URL   = 'http://34.117.118.60/update-balance';

exports.processRecharge = async (message, context) => {
  const payload = Buffer.from(message.data, 'base64').toString();
  let phone, amount;
  try {
    ({ phone, amount } = JSON.parse(payload));
  } catch (e) {
    console.error('❌ Payload inválido:', payload);
    return;
  }

  if (!phone || amount === undefined) {
    console.error('❌ Faltan campos en el mensaje:', payload);
    return;
  }

  console.log(`📲 Procesando recarga para ${phone} — ₡${amount}`);

  // 1) Registro
  try {
    const res1 = await fetch(REGISTER_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, amount })
    });
    if (res1.ok) {
      console.log(`✅ Recarga registrada en Firestore para ${phone}`);
    } else {
      console.error('❌ Error en registro:', await res1.text());
    }
  } catch (err) {
    console.error('❌ Falló llamada a registro:', err);
  }

  // 2) Actualización de saldo
  try {
    const res2 = await fetch(UPDATE_BALANCE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, amount })
    });
    if (res2.ok) {
      console.log(`✅ Saldo actualizado para ${phone}`);
    } else {
      console.error('❌ Error actualizando saldo:', await res2.text());
    }
  } catch (err) {
    console.error('❌ Falló llamada a actualización de saldo:', err);
  }
};
