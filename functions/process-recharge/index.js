/**
 * Cloud Function triggered by Pub/Sub to process recharge events.
 */

exports.processRecharge = (message, context) => {
  try {
    const data = JSON.parse(Buffer.from(message.data, 'base64').toString());

    const { phone, amount } = data;

    console.log(`📲 Procesando recarga: Número ${phone}, Monto ₡${amount}`);

    // Aquí puedes conectar con el microservicio en GKE para registrar la venta más adelante.

    return;
  } catch (err) {
    console.error('❌ Error al procesar mensaje de Pub/Sub:', err);
    throw new Error('Error al procesar mensaje');
  }
};
