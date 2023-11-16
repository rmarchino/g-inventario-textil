const { Facturas } = require('../models');

const getAllFactura = async (req, res, next) => {
    try {
        const factura = await Facturas.findAll();
        res.json(factura);
        
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAllFactura,
};