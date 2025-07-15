import express from 'express';
import { Firestore, FieldValue } from '@google-cloud/firestore';

const app = express();
const port = process.env.PORT || 8080;

const firestore = new Firestore();

app.use(express.json());

app.post('/update-balance', async (req, res) => {
  const { phone, amount } = req.body;

  if (!phone || amount === undefined) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const saldoRef = firestore.collection('saldos').doc(phone);

    // Incrementa el saldo atómicamente
    await saldoRef.set(
      {
        saldo: FieldValue.increment(amount),
        lastUpdate: new Date().toISOString(),
      },
      { merge: true }
    );

    console.log(`✅ Saldo actualizado: ${phone} + ₡${amount}`);
    res.status(200).json({ message: 'Saldo actualizado exitosamente' });
  } catch (error) {
    console.error('❌ Error al actualizar saldo:', error);
    res.status(500).json({ error: 'Error al actualizar saldo' });
  }
});

app.get('/', (req, res) => {
  res.send('🏦 Servicio de Actualización de Saldo');
});

app.listen(port, () => {
  console.log(`🚀 Microservicio de saldo escuchando en http://localhost:${port}`);
});
