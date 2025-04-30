const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mvc_libros'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conectado a la base de datos.');
});

// Obtener todos los autores
app.get('/autores', (req, res) => {
  db.query('SELECT * FROM autor', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Insertar autor
app.post('/autores', (req, res) => {
  const { nombre, nacionalidad, fecha_nacimiento, biografia } = req.body;
  const query = 'INSERT INTO autor (nombre, nacionalidad, fecha_nacimiento, biografia) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, nacionalidad, fecha_nacimiento, biografia], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ id: results.insertId });
  });
});

// Eliminar autor
app.delete('/autores/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM autor WHERE id_autor = ?', [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ status: 'Autor eliminado' });
  });
});

// Obtener libros por autor
app.get('/autores/:id/libros', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM libro WHERE id_autor = ?', [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.listen(3001, () => {
  console.log('Servidor backend corriendo en http://localhost:3001');
});
