const express = require('express');
const router = express.Router();
const controller = require('../controllers/libroController');

router.get('/', controller.listar);
router.get('/add', controller.mostrarFormularioAgregar);
router.post('/add', controller.agregar);
router.get('/edit/:id', controller.mostrarFormularioEditar);
router.post('/edit/:id', controller.editar);
router.get('/delete/:id', controller.eliminar);

module.exports = router;