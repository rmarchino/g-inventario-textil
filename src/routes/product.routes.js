const {Router} = require('express');
const { FindAllProducts } = require('../controllers/product.controllers');

const router = Router();

router.get('/productos', FindAllProducts);



module.exports = router;