const express = require('express');
const { Firestore } = require('@google-cloud/firestore');
const app = express();
const port = process.env.PORT || 8080;

const firestore = new Firestore();

app.use(express.json());

app.post('/register', async (req, res) => {
  const { phone, amount } = req.body;

  if (!phone || !amount) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const ref = firestore.collection('recargas').doc();
    await ref.set({
      phone,
      amount,
      timestamp: new Date().toISOString(),
    });

    console.log(`✅ Recarga registrada: ${phone} - ₡${amount}`);
    res.status(200).json({ message: 'Recarga registrada exitosamente' });
  } catch (error) {
    console.error('❌ Error al registrar recarga:', error);
    res.status(500).json({ error: 'Error al registrar recarga' });
  }
});

app.get('/', (req, res) => {
  res.send('🏥 Servicio de Registro de Recargas en Firestore');
});

app.listen(port, () => {
  console.log(`🚀 Microservicio escuchando en http://localhost:${port}`);
});
