const { Router } = require('express');
const { GetAllCompras, GetDetailCompras } = require('../controllers/compra.controllers');

const router = Router();

router.get('/compras', GetAllCompras);
router.get('/compras/:id', GetDetailCompras);


module.exports = router;