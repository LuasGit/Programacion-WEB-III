const db = require('../models/db');

exports.getAutores = (req, res) => {
  db.query('SELECT * FROM autor', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

exports.addAutor = (req, res) => {
  const { nombre, nacionalidad, fecha_nacimiento, biografia } = req.body;
  db.query('INSERT INTO autor (nombre, nacionalidad, fecha_nacimiento, biografia) VALUES (?, ?, ?, ?)',
    [nombre, nacionalidad, fecha_nacimiento, biografia],
    (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId, ...req.body });
    });
};

exports.updateAutor = (req, res) => {
  const { id } = req.params;
  const { nombre, nacionalidad, fecha_nacimiento, biografia } = req.body;
  db.query('UPDATE autor SET nombre = ?, nacionalidad = ?, fecha_nacimiento = ?, biografia = ? WHERE id_autor = ?',
    [nombre, nacionalidad, fecha_nacimiento, biografia, id],
    (err) => {
      if (err) throw err;
      res.json({ id: parseInt(id), ...req.body });
    });
};

exports.deleteAutor = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM autor WHERE id_autor = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Autor eliminado' });
  });
};

exports.getLibrosByAutor = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM libro WHERE id_autor = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};