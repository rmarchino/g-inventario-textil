const { Router } = require('express');
const { createUser, loginUser, findAllUser, createProducto, createCliente, createProveedor, registerSalidaProducto } = require('../controllers/user.controllers');
const { createUserValidator, loginUserValidator } = require('../validators/users.validators');
const { authenticate } = require('../middlewares/auth.middleware');
const createProductoValidator = require('../validators/producto.validator');
const createClienteValidator = require('../validators/cliente.validator');
const createProveedorValidator = require('../validators/proveedor.validator');
// const { isAdmin, hasRoles } = require('../middlewares/role.middleware');



const router = Router();

router.post("/users", createUserValidator, createUser);
router.post("/user/login", loginUserValidator, loginUser);
router.post('/productos', createProductoValidator, authenticate, createProducto);
router.post('/clientes', createClienteValidator, authenticate, createCliente);
router.post("/proveedores", createProveedorValidator, authenticate, createProveedor);
router.post("/entrada-productos", registerSalidaProducto)
router.post("/salida-productos", registerSalidaProducto)
router.get("/users", findAllUser);

module.exports = router;