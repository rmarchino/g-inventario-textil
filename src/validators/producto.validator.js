const { check } = require("express-validator");
const validateResult = require("../utils/validate");

const createProductoValidator = [
  check("nombre", "Error en el campo nombre")
    .exists()
    .withMessage("nombre es obligatoio")
    .notEmpty()
    .withMessage("nombre no debe de estar vacío")
    .isString()
    .withMessage("El tipo de dato debe de ser estring")
    .isLength({ min: 10 })
    .withMessage("El nombre debe tener mínimo 10 caracteres"),

  check("descripcion", "Error en el campo descripcion")
    .isString()
    .withMessage("El tipo de dato debe de ser estring")
    .isLength({ min: 10 })
    .withMessage("El descripcion debe tener mínimo 10 caracteres"),

  check("precio", "Error en el campo precio")
    .isNumeric()
    .withMessage("El tipo de dato debe ser numérico")
    .notEmpty()
    .withMessage("precio no debe de estar vacío"),

  check("stock", "Error en el campo stock")
    .isInt()
    .withMessage("Tipo de dato debe de ser entero")
    .notEmpty()
    .withMessage("stock no debe de estar vacío"),

  check("categoria", "Error en el campo categoria")
    .notEmpty()
    .withMessage("categoria no debe de estar vacío"),

  // check("usuario", "Error en el campo usuario")
  //   .notEmpty()
  //   .withMessage("usuario no debe de estar vacío"),

  validateResult,
];

module.exports = createProductoValidator;
