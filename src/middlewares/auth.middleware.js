const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Usuarios } = require("../models");

const authenticate = (req, res, next) => {
  try {
    //Recuperar el token
    const token = req.headers["access-token"];
    if (!token) {
      return next({
        status: 401,
        name: "No estas enviando el token",
        message: "Token no está presente en los encabezados de solicitud",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_LOGIN, {
      algorithms: "HS512",
    });

    req.user = decoded;
    next();
  } catch (error) {
    next({
      status: 498,
      name: "Token Inválido o expirado",
      message: error,
    });
  }
};

const validateEmail = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_EMAIL_VALIDATION, {
      algorithms: "HS512",
    });

    if (!decoded) {
      next({
        status: "400",
        name: "Error al validar email",
        message: "El token es invalido, solicite nuevamente",
      });
    }

    await Usuarios.update(
      { validEmail: true },
      {
        where: { email: decoded.email },
      }
    );
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
  validateEmail,
};
