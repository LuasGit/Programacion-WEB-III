const Libro = require('../models/libroModel');

module.exports = {
  listar: (req, res) => {
    Libro.getAll((err, results) => {
      res.render('index', { libros: results });
    });
  },
  mostrarFormularioAgregar: (req, res) => {
    res.render('add');
  },
  agregar: (req, res) => {
    Libro.create(req.body, () => res.redirect('/'));
  },
  mostrarFormularioEditar: (req, res) => {
    Libro.getById(req.params.id, (err, results) => {
      res.render('edit', { libro: results[0] });
    });
  },
  editar: (req, res) => {
    Libro.update(req.params.id, req.body, () => res.redirect('/'));
  },
  eliminar: (req, res) => {
    Libro.delete(req.params.id, () => res.redirect('/'));
  }
};