const { Router } = require('express');
const { getAllFactura } = require('../controllers/factura.controllers');

const router = Router();

router.get('/factura', getAllFactura);


module.exports = router;