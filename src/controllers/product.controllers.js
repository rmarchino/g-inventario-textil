const {Productos} = require('../models');


const FindAllProducts = async (req, res, next) => {
    try {
        //Obtener todos los productos
        const product = await Productos.findAll();
        res.json(product);
        
    } catch (error) {
        next(error);
    }
}


module.exports = {
    FindAllProducts,
}