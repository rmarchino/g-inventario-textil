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
        const compra = await Compras.findByPk(compraId, {
            include: [{
                model: DetailCompras,
                include: [Productos]
            }]
        });

        if(!compra) {
            return res.status(404).json({
                error: 'Compra no encontrada'
            });
        }

        res.json(compra);
        
    } catch (error) {
        next(error);
    }
}

module.exports = {
    GetAllCompras,
    GetDetailCompras,
}