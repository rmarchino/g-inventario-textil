const { Router } = require('express');
const { FindAllCategorias } = require('../controllers/categoria.controllers');
const router = Router();

router.get('/categorias', FindAllCategorias);

module.exports = router;