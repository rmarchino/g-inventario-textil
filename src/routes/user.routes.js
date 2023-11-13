const { Router } = require('express');
const { createUser, loginUser, findAllUser, CreateUsersInventrio, CreateCompra } = require('../controllers/user.controllers');
const { createUserValidator, loginUserValidator } = require('../validators/users.validators');


const router = Router();

router.post("/users", createUserValidator, createUser);
router.post("/login", loginUserValidator, loginUser);
router.get("/users", findAllUser);
router.post('/users-inventario', CreateUsersInventrio);
router.post('/realizar-compra', CreateCompra);

module.exports = router;