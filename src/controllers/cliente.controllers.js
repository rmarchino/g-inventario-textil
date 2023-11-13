const { Clientes } = require('../models');

const FindAllClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.findAll();
        res.json(clientes);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    FindAllClientes,
}