const { Router } = require('express');
const { FindAllProveedores } = require('../controllers/proveedor.controllers');

const router = Router();

router.get('/proveedores', FindAllProveedores);


module.exports = router;
  