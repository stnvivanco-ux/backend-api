const express = require('express');
const app = express();

const PORT = 8080;

// URL del backend-data (más adelante la usaremos de verdad)
const backendDataUrl = process.env.BACKEND_DATA_URL || 'http://backend-data-svc:8081/mensaje';

// Endpoint que llamará el frontend: GET /mensaje
app.get('/mensaje', async (req, res) => {
  // POR AHORA: respondemos algo fijo (luego lo cambiaremos para llamar a backend-data)
  res.json({
    texto: 'Hola desde backend-api (aún sin conectar a la base de datos)'
  });
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`backend-api escuchando en puerto ${PORT}`);
  console.log(`BACKEND_DATA_URL = ${backendDataUrl}`);
});