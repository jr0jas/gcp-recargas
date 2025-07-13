document.getElementById('recargaForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const telefono = document.getElementById('telefono').value;
  const monto = parseFloat(document.getElementById('monto').value);
  const mensaje = document.getElementById('mensaje');

  mensaje.textContent = 'Enviando recarga...';

  try {
    const response = await fetch('https://<ENDPOINT-DE-TU-CLOUD-RUN>/procesarRecarga', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telefono, monto })
    });

    if (response.ok) {
      mensaje.textContent = 'Recarga enviada con éxito. En proceso...';
    } else {
      mensaje.textContent = 'Error al enviar recarga.';
    }
  } catch (error) {
    console.error('Error:', error);
    mensaje.textContent = 'Error de red o servidor.';
  }
});
