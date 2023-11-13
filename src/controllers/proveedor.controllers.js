const { Proveedores } = require('../models');


const FindAllProveedores = async (req, res, next) => {
    try {
        const proveedor = await Proveedores.findAll();
        res.json(proveedor);

    } catch (error) {
        next(error)
    }
}


module.exports = {
    FindAllProveedores,
}