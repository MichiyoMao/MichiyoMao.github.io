const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Yotsuba',
  password: 'Ascension1945',
  port: 5432,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'assets')));

// Ruta para servir la página de inscripción
app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, 'registration.html'));
});

// Ruta para manejar la inscripción
app.post('/register', async (req, res) => {
  const { name, email, course, message } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO inscripciones (nombre, correo, curso, mensaje) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, course, message]
    );
    res.status(200).send('Inscripción recibida con éxito.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al procesar la inscripción.');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${5500}`);
});
