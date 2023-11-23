const { check } = require('express-validator');
const validateResult = require('../utils/validate');


const createProveedorValidator = [
    check('nombre', 'Error en el campo nombre')
        .exists().withMessage('nombre es obligatoio')
        .notEmpty().withMessage('nombre no debe de estar vacío')
        .isString().withMessage('El tipo de dato debe de ser estring')
        .isLength({ max: 100 }).withMessage('El nombre debe tener mínimo 100 caracteres'),

    check('direccion', 'Error en el campo direccion')
        .isString().withMessage('El tipo de dato debe de ser estring')
        .isLength({ max: 100 }).withMessage('El direccion debe tener máximo 100 caracteres'),

    check('telefono', 'Error en el campo telefono')
        .isString().withMessage('El tipo de dato debe de ser estring')
        .notEmpty().withMessage('telefono no debe de estar vacío')
        .isLength({ max: 9 }).withMessage('El telefono debe tener máximo 9 caracteres'),

    check('ruc', 'Error en el campo ruc')
        .isString().withMessage('El tipo de dato debe de ser estring')
        .isLength({ min: 11, max: 11 }).withMessage('El ruc debe tener mínimo 11 caracteres'),

    check('email', 'Error en el campo email')
        .exists().withMessage("email es obligatorio")
        .notEmpty().withMessage("email no puede estar vacío")
        .isEmail().withMessage("email no tiene formato de correo")
        .isLength({ min: 10, max: 50 }).withMessage("El email debe tener minimo 10 caracteres y máximo 50"),

    check('usuario', 'Error en el campo usuario')
        .isInt().withMessage('Tipo de dato debe de ser entero')
        .notEmpty().withMessage('usuario no debe de estar vacío'),
    
    validateResult
]


module.exports = createProveedorValidator;