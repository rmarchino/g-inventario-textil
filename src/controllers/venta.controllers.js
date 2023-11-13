const { Ventas, DetailVentas, Productos } = require('../models');


const GeatAllVentas = async (req, res, next) => {
    try {
        const ventas = await Ventas.findAll();
        res.json(ventas);
        
    } catch (error) {
        next(error);
    }
};

const GetDetailsVentas = async (req, res, next) => {
    try {
        const ventaId = req.params.id;
        const venta = await Ventas.findByPk(ventaId, {
            include: [{ model: DetailVentas, include: [Productos] }]
        });
        res.json(venta);

    } catch (error) {
        next(error);
    }
};


module.exports = {
    GeatAllVentas,
    GetDetailsVentas
}