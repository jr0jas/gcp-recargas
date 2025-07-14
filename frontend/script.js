document.getElementById('recargaForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const numero = document.getElementById('numero').value;
  const monto = document.getElementById('monto').value;
  const endpoint = 'https://us-central1-gcp-recargas.cloudfunctions.net/publishRecharge';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numero, monto })
    });

    const result = await res.text();
    document.getElementById('respuesta').textContent = '✅ Recarga enviada correctamente.';
  } catch (error) {
    console.error('Error al enviar recarga:', error);
    document.getElementById('respuesta').textContent = '❌ Error al enviar recarga.';
  }
});
