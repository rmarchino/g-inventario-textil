const { Categorias } = require('../models');

const FindAllCategorias = async (req, res, next) => {
    try {
        let categorias = await Categorias.findAll();
        res.json(categorias);
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    FindAllCategorias,
}