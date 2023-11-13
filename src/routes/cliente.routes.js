const { Router } = require('express');
const { FindAllClientes } = require('../controllers/cliente.controllers');

const router = Router();

router.get('/clientes', FindAllClientes);

module.exports = router;

