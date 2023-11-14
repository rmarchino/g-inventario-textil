const { Router } = require('express');
const { createUser, loginUser, findAllUser, CreateUsersInventrio, CreateCompra, RealizarVenta } = require('../controllers/user.controllers');
const { createUserValidator, loginUserValidator } = require('../validators/users.validators');
const { authenticate } = require('../middlewares/auth.middleware');


const router = Router();

router.post("/users", createUserValidator, authenticate, createUser);
router.post("/login", loginUserValidator, loginUser);
router.get("/users", findAllUser);
router.post('/users-inventario', CreateUsersInventrio);
router.post('/realizar-compra', CreateCompra);
router.post("/realizar-venta", RealizarVenta);

module.exports = router;