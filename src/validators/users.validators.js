const {check} = require("express-validator");
const validateResult = require("../utils/validate");


const createUserValidator = [
    check('firstname', 'Error en el campo firstname')
        .exists().withMessage('firstname es obligatoio')
        .notEmpty().withMessage('firstname no debe de estar vacío')
        .isString().withMessage('El tipo de dato debe de ser estring')
        .isLength({ max: 30 }).withMessage('El firstname debe tener máximo 30 caracteres'),

    check('lastname', 'Error en el campo lastname')
        .exists().withMessage('lastname es obligatorio')
        .notEmpty().withMessage('lastname no debe de estar vacío')
        .isString().withMessage('El tipo de dato del lastname debe de ser string')
        .isLength({max : 30}).withMessage('El lastname debe tener máximo 30 caractéres'),

    check('username', 'Error en el campo username')
        .exists().withMessage('username es obligatorio')
        .notEmpty().withMessage('username no debe de estar vacío')
        .isString().withMessage('El tipo de dato del username debe de ser estring')
        .isLength({ min: 5, max: 30 }).withMessage('El username debe tener máximo 30'),

    check('email', 'Error en el campo email')
        .exists().withMessage('email es obligatorio')
        .notEmpty().withMessage('El email no debe de estar vacío')
        .isString().withMessage("email debe ser un string")
        .isEmail().withMessage("email no tiene formato de correo")
        .isLength({ min: 8, max: 50 }).withMessage("El email debe tener minimo 8 caracteres y máximo 50"),

    check("password", "Error con el campo password")
        .exists().withMessage("password es obligatorio")
        .notEmpty().withMessage("password no puede estar vacio")
        .isString().withMessage("El password debe ser un string")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%-^&*])[A-Za-z\d!@#$%-^&*]{8,}$/
        ).withMessage(
            "La contraseña debe tener minimo 8 caracteres una mayuscula, una minuscula, un numero y un caracter especial"
        ),
    
    validateResult
];

const loginUserValidator = [
    check("username", "error con el campo username")
        .exists().withMessage("El username es obligatorio")
        .notEmpty().withMessage("El username no debe estar vacio")
        .isString().withMessage("El username no es un string")
        .isLength({ min: 6, max: 30 }).withMessage('El username debe de tener mínimo 6 carácteres y máximo 30'),

    check("email", "Error con el campo email")
        .exists().withMessage("email is obligatorio")
        .notEmpty().withMessage("email no puede estar vacío")
        .isEmail().withMessage("email no tiene formato de correo")
        .isLength({ min: 10, max: 50 }).withMessage("El email debe tener minimo 10 caracteres y máximo 50"),

    check("password", "Error con el campo password")
        .exists().withMessage("password es obligatorio")
        .notEmpty().withMessage("password no puede estar vacío")
        .isString().withMessage("password debe ser string")
        .isLength({ min: 8 }).withMessage("El password debe tener minimo 8 caracteres")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%-^&*])[A-Za-z\d!@#$%-^&*]{8,}$/
        ).withMessage(
            "La contraseña debe tener minimo 8 caracteres una mayuscula, una minuscula, un numero y un caracter especial"
        ),

        validateResult
];


module.exports = {
    createUserValidator,
    loginUserValidator
};