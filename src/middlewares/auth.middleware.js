const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    try {
        //Recuperar el token
        const token = req.headers['access-token'];
        if (!token) {
            return next({
                status: 401,
                name: 'No estas enviando el token',
                message: 'Token no está presente en los encabezados de solicitud'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_LOGIN, {
            algorithms: 'HS512'
        });

        req.user = decoded;
        next();
        
    } catch (error) {
        next({
            status: 498,
            name: "Token Inválido o expirado",
            message: error
        });
    }
}


module.exports = {
    authenticate,
}