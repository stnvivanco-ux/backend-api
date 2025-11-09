const express = require('express');
const http = require('http');

const app = express();
const port = process.env.PORT || 8080;

// URL del backend-data, desde variable de entorno o por defecto
const BACKEND_DATA_URL = process.env.BACKEND_DATA_URL || 'http://backend-data-svc:8080';

app.get('/mensaje', (req, res) => {
  const url = `${BACKEND_DATA_URL}/mensaje`;

  http.get(url, (resp) => {
    let data = '';

    resp.on('data', chunk => { data += chunk; });
    resp.on('end', () => {
      try {
        const json = JSON.parse(data);
        // Reenviamos el texto que vino de backend-data / base de datos
        res.json({ texto: json.texto });
      } catch (e) {
        console.error('Error parseando respuesta de backend-data:', e);
        res.status(500).json({ texto: 'Error al procesar respuesta de backend-data.' });
      }
    });
  }).on('error', (err) => {
    console.error('Error llamando a backend-data:', err.message);
    res.status(500).json({ texto: 'No se pudo contactar con backend-data.' });
  });
});

app.listen(port, () => {
  console.log(`backend-api escuchando en puerto ${port}`);
});