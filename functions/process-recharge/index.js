/**
 * Cloud Function triggered by Pub/Sub message
 */
exports.processRecharge = (message, context) => {
  const data = JSON.parse(Buffer.from(message.data, 'base64').toString());

  console.log('📥 Mensaje recibido en processRecharge:');
  console.log('📞 Teléfono:', data.phone);
  console.log('💰 Monto:', data.amount);

  // Aquí más adelante puedes llamar al microservicio GKE vía HTTP
};
