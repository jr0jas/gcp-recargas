const fetch = require('node-fetch');

const REGISTER_SERVICE_URL = 'http://34.8.91.19/register';
const UPDATE_BALANCE_URL = 'http://34.117.118.60/update-balance';

exports.processRecharge = async (message, context) => {
  try {
    const data = JSON.parse(Buffer.from(message.data, 'base64').toString());
    const { phone, amount } = data;

    if (!phone || !amount) {
      console.error('❌ Faltan campos requeridos en el mensaje:', data);
      return;
    }

    let registerSuccess = false;
    let updateSuccess = false;

    // Llamar al microservicio de registro
    try {
      const res1 = await fetch(REGISTER_SERVICE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, amount }),
      });

      if (res1.ok) {
        registerSuccess = true;
        console.log(`✅ Registro exitoso para ${phone}`);
      } else {
        const errText = await res1.text();
        console.error(`❌ Error registrando recarga: ${errText}`);
      }
    } catch (err) {
      console.error('❌ Falló llamada al microservicio de registro:', err);
    }

    // Llamar al microservicio de actualización de saldo
    try {
      const res2 = await fetch(UPDATE_BALANCE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, amount }),
      });

      if (res2.ok) {
        updateSuccess = true;
        console.log(`✅ Saldo actualizado para ${phone}`);
      } else {
        const errText = await res2.text();
        console.error(`❌ Error actualizando saldo: ${errText}`);
      }
    } catch (err) {
      console.error('❌ Falló llamada al microservicio de saldo:', err);
    }

    // Resultado final
    if (registerSuccess && updateSuccess) {
      console.log(`🎉 Ambos microservicios respondieron correctamente para ${phone}`);
    } else if (registerSuccess) {
      console.warn(`⚠️ Solo se registró la recarga, falló la actualización de saldo`);
    } else if (updateSuccess) {
      console.warn(`⚠️ Solo se actualizó el saldo, falló el registro de la recarga`);
    } else {
      console.error(`❌ Fallaron ambos microservicios`);
    }

  } catch (err) {
    console.error('❌ Error procesando mensaje Pub/Sub:', err);
  }
};
