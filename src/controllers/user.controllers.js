const { Usuarios } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async (req, res, next) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 10) 
        const user = await Usuarios.create({
            firstname,
            lastname,
            username,
            email,
            password: hashed,
        });
        res.json(user);

    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await Usuarios.findOne({
            where: {email}
        });
        
        // si no existe devuelve null
        if(!user) {
            return next({
                status: 400,
                name: "Email Inválido",
                message: 'Email no existe'
            })
        }

        // Si el usuario existe devuelve en objeto
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return next({
                status: 400,
                name: "Password incorrecto",
                message: "Password no coincide  con el email del usuario"
            });
        }
        const {id, firstname, lastname, username, validEmail, profileImage, role, createdAt, updatedAt } = user;
        const userData = {id, firstname, lastname, username, validEmail, profileImage, role, createdAt, updatedAt }
        
        // Generar token 
        const token = jwt.sign(userData, process.env.JWT_SECRET_LOGIN, {
            algorithm: 'HS512', 
            expiresIn: '1h'
        });

        userData.token = token;
        res.json(userData);

    } catch (error) {
        next(error);
    }
}

const findAllUser = async (req, res, next) => {
    try {
        // Ontener todos los usuarios
        const users = await Usuarios.findAll();
        res.json(users);
        
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createUser,
    loginUser,
    findAllUser,
}