const { Router } = require("express");
const {
  createUser,
  loginUser,
  findAllUser,
  createProducto,
  createCliente,
  createProveedor,
  registerSalidaProducto,
  registerEntradaProducto,
} = require("../controllers/user.controllers");

const {
  createUserValidator,
  loginUserValidator,
} = require("../validators/users.validators");
const {
  authenticate,
  validateEmail,
} = require("../middlewares/auth.middleware");

const createProductoValidator = require("../validators/producto.validator");
const createClienteValidator = require("../validators/cliente.validator");
const createProveedorValidator = require("../validators/proveedor.validator");
const { uploadImageProduct } = require("../utils/multer");
const { cropImageProduct } = require("../utils/imageCropper");
// const { isAdmin, hasRoles } = require('../middlewares/role.middleware');

const router = Router();

router.post("/users", createUserValidator, createUser);
router.post("/user/login", loginUserValidator, loginUser);
router.post(
  "/productos",
  uploadImageProduct.single("imagen"),
  cropImageProduct,
  createProductoValidator,
  authenticate,
  createProducto
);
router.post("/clientes", createClienteValidator, authenticate, createCliente);
router.post(
  "/proveedores",
  createProveedorValidator,
  authenticate,
  createProveedor
);
router.post("/entrada-productos", registerEntradaProducto);
router.post("/salida-productos", registerSalidaProducto);
router.get("/users", findAllUser);
router.post("/users/email-validate", validateEmail);

module.exports = router;
