const { 
    Usuarios,
    Productos,
    UserInventarios,
    Compras,
    Ventas,
    DetailCompras,
    DetailVentas,
    Facturas,
    Clientes,
} = require('../models');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async (req, res, next) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 10) 
        const user = await Usuarios.create({
            firstname,
            lastname,
            username,
            email,
            password: hashed,
        });
        res.json(user);

    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await Usuarios.findOne({
            where: {email}
        });
        
        // si no existe devuelve null
        if(!user) {
            return next({
                status: 400,
                name: "Email Inválido",
                message: 'Email no existe'
            })
        }

        // Si el usuario existe devuelve en objeto
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return next({
                status: 400,
                name: "Password incorrecto",
                message: "Password no coincide  con el email del usuario"
            });
        }
        const {id, firstname, lastname, username, validEmail, profileImage, role, createdAt, updatedAt } = user;
        const userData = {id, firstname, lastname, username, validEmail, profileImage, role, createdAt, updatedAt }
        
        // Generar token 
        const token = jwt.sign(userData, process.env.JWT_SECRET_LOGIN, {
            algorithm: 'HS512', 
            expiresIn: '1h'
        });

        userData.token = token;
        res.json(userData);

    } catch (error) {
        next(error);
    }
}

const findAllUser = async (req, res, next) => {
    try {
        // Ontener todos los usuarios
        const users = await Usuarios.findAll();
        res.json(users);
        
    } catch (error) {
        next(error);
    }
}

const CreateUsersInventrio = async (req, res, next) => {
    try {
        const { usuarioId, productoId, accion } = req.body;

        //Verificar que el usuario y el producto existan
        let userExist = await Usuarios.findByPk(usuarioId);
        const productExist = await Productos.findByPk(productoId);

        if (!userExist || productExist) {
            return res.status(404).json({ 
                error: 'uario o producto no encontrado. '
             });
        }

        // Lógica para determinar la acción (Agregar o Eliminar)
        if (accion === 'Agregar') {
            //Incrementar la cantidad en el stock del producto
            productExist.stock += 1;
        } else if (accion === 'Eliminar') {
            productExist.stock -=1;
        } else {
            return res.status(400).json({
                error: "Acción no válida. Debe ser Agregar o  Eliminar."
            });
        }

        // Guardar la accion en la tabla UserInventario
        await UserInventarios.create({
            usuarioId,
            productoId,
            createdAt: new Date(),
        });

        //Guardar los cambios en el producto
        await productExist.save();

        res.status(201).json({
            message: 'Acción registrada en el inventario exitosamente.'
        });

    } catch (error) {
        next(error);
    }
}

const CreateCompra = async (req, res, next) => {
    try {
        const { usuarioId, productos  } = req.body;

        //Verificar que el usuario y producto existe
        const userExist = await Usuarios.findByPk(usuarioId);

        if(!userExist ){
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        //Crear una nueva compra
        const nuevaCompra = await Compras.create({
            proveedorId,
            usuarioId,
            createdAt: new Date(),
        });

        // Iterar sobre los productos y crear detalles de compra
        for (const { productoId, cantidad, precioUnitario } of productos) {
            
            //Verificar que el producto exista
            const productoExist = await Productos.findByPk(productoId);
            if (!productoExist) {
                return res.status(404).json({
                    error: `Producto con id ${productoId}, no se encuentra`
                });
            }

            // Verificar si hay suficiente stock
            if(productoExist.stock < cantidad) {
                return res.status(400).json({
                    error: `Stock insuficiente para el producto con ID ${productoId}.`
                });
            }

            //Actualizar el stock del producto
            productoExist.stock -= cantidad;
            await productoExist.save();

            //Crear el detalle de la compra
            await DetailCompras.create({
                compraId: nuevaCompra.id,
                productoId,
                cantidad,
                precioUnitario,
            });
        }
        res.status(201).json({
            message: "La compra fue realizada exitosamente"
        });
        
    } catch (error) {
        next(error);
    }
}

const RealizarVenta = async (req, res, next) => {
    try {
        const { usuarioId, clienteId, productos } = req.body;

        //Validar que el cliente y usuario exista
        const userExist = await Usuarios.findByPk(usuarioId);
        const clienteExist = await Clientes.findByPk(clienteId);

        if (!userExist || clienteExist) {
            return res.status(404).json({
                error: 'Usuario o cliente no encontrado.'
            })
        };

        //Crear una venta
        const nuevaVenta = await Ventas.create({
            usuarioId,
            clienteId,
            createdAt: new Date(),
        });

        //Iterar sobre los productos y crear detalles de venta
        for (const { productoId, cantidad, precioUnitario } of productos) {
            
            //Verificar si el producto existe en inventario
            const productExist = await Productos.findByPk(productoId);

            if (!productExist) {
                return res.status(404).json({
                    error: `El producto con id ${productoId}, no se encuentra registrado.`
                });
            }

            //Verificar si hay suficiente stock disponible
            if (productExist.stock < cantidad) {
                return res.status(400).json({
                    error: `No hay suficientes unidades del producto para la venta solicitada con el ID ${productoId}`
                });
            }

            //Actulizar el stock del producto
            productExist.stock -= cantidad;
            await productExist.save();

            //Crear el detalle de la venta
            await DetailVentas.create({
                ventaId: nuevaVenta.id,
                productoId,
                cantidad,
                precioUnitario,
            });
        }

        //Calcular el subtotal, IGV y total para la factura
        const subTotal = cantidad * precioUnitario ;
        const igv = subTotal * 0.18;
        const total = subTotal + igv;

        //Crear la factura asociada a la venta
        const factura = await Facturas.create({
            usuarioId,
            ventaId: nuevaVenta.id,
            createdAt: new Date(),
            subTotal: subTotal,
            igv: igv,
            total: total,
        });

        res.status(201).json({
            message: 'La venta fue realizada exitosamente',
        })
        
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createUser,
    loginUser,
    findAllUser,
    CreateUsersInventrio,
    CreateCompra,
    RealizarVenta,
}