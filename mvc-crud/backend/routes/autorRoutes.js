const express = require('express');
const router = express.Router();
const autorController = require('../controllers/autorController');

router.get('/autores', autorController.getAutores);
router.post('/autores', autorController.addAutor);
router.put('/autores/:id', autorController.updateAutor);
router.delete('/autores/:id', autorController.deleteAutor);
router.get('/autores/:id/libros', autorController.getLibrosByAutor);

module.exports = router;