const { Compras, DetailCompras, Productos } = require('../models');

const GetAllCompras = async (req, res, next) => {
    try {
        const compra = await Compras.findAll();
        res.json(compra);

    } catch (error) {
        next(error);
    }
};

const GetDetailCompras = async (req, res, next) => {
    try {
        const compraId = req.params.id;
        const compra = await Compras.findByPark(compraId, {
            include: [{
                model: DetailCompras,
                include: [Productos]
            }]
        });

        res.json(compra);
        
    } catch (error) {
        next(error);
    }
}

module.exports = {
    GetAllCompras,
    GetDetailCompras,
}