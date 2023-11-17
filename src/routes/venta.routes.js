const { Router } = require('express');
const { GeatAllVentas, GetDetailsVentas } = require('../controllers/venta.controllers');

const router = Router();

router.get('/ventas', GeatAllVentas);
router.get('/ventas/:id/detalle', GetDetailsVentas);

module.exports = router;