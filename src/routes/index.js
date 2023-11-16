const userRouter = require("./user.routes");
const productRouter = require("./product.routes");
const proveedorRouter = require("./proveedor.routes");
const clienteRouter = require('./cliente.routes');
const categoriaRouter = require('./categoria.routes');
const compraRouter = require("./compras.routes");
const ventaRouter = require("./venta.routes");
const facturaRouter = require("./factura.routes");

const apiRoutes = (app) => {
    app.use(userRouter);
    app.use(productRouter);
    app.use(proveedorRouter);
    app.use(clienteRouter);
    app.use(categoriaRouter);
    app.use(compraRouter);
    app.use(ventaRouter);
    app.use(facturaRouter);
};

module.exports = apiRoutes;