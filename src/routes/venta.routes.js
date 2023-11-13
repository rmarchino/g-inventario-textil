const { Router } = require('express');
const { GeatAllVentas, GetDetailsVentas } = require('../controllers/venta.controllers');

const router = Router();

router.get('/ventas', GeatAllVentas);
router.get('/ventas/:id', GetDetailsVentas);

module.exports = router;