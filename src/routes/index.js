const userRouter = require("./user.routes");
const productRouter = require("./product.routes");
const proveedorRouter = require("./proveedor.routes");

const apiRoutes = (app) => {
    app.use(userRouter);
    app.use(productRouter);
    app.use(proveedorRouter);
};


module.exports = apiRoutes;