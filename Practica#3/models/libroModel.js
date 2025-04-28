const db = require('../db');

module.exports = {
  getAll: (callback) => {
    db.query('SELECT * FROM libros', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM libros WHERE id = ?', [id], callback);
  },
  create: (data, callback) => {
    db.query('INSERT INTO libros SET ?', data, callback);
  },
  update: (id, data, callback) => {
    db.query('UPDATE libros SET ? WHERE id = ?', [data, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM libros WHERE id = ?', [id], callback);
  }
};