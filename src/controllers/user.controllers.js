const {
  Usuarios,
  Productos,
  EntradaProductos,
  SalidaProductos,
  Facturas,
  Clientes,
  Proveedores,
  sequelize,
} = require("../models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendWelcomeMail } = require("../utils/sendMail");
require("dotenv").config();

const createUser = async (req, res, next) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await Usuarios.create({
      firstname,
      lastname,
      username,
      email,
      password: hashed,
    });
    res.json(user);

    // Mandar un token para identificar esta acción
    const verifyToken = jwt.sign(
      { username, email },
      process.env.JWT_SECRET_EMAIL_VALIDATION,
      {
        algorithm: "HS512",
        expiresIn: "12h",
      }
    );

    //Enviar el email de bienvenida
    sendWelcomeMail(email, { username, verifyToken });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Usuarios.findOne({
      where: { email },
    });

    // si no existe devuelve null
    if (!user) {
      return next({
        status: 400,
        name: "Email Inválido",
        message: "Email no existe",
      });
    }

    // Validar el email del usuario si es válido
    if (!user.validEmail) {
      return next({
        status: 400,
        name: "Email no está verificado",
        message: "Usuario necesita verificar su email",
      });
    }

    console.log(user.validEmail);

    // Si el usuario existe devuelve en objeto
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return next({
        status: 400,
        name: "Password incorrecto",
        message: "Password no coincide  con el email del usuario",
      });
    }
    const { id, firstname, lastname, username, role } = user;
    const userData = { id, firstname, lastname, username, role };

    // Generar token
    const token = jwt.sign(userData, process.env.JWT_SECRET_LOGIN, {
      algorithm: "HS512",
      expiresIn: "1h",
    });

    userData.token = token;
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

const findAllUser = async (req, res, next) => {
  try {
    // Ontener todos los usuarios
    const users = await Usuarios.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const createProducto = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, stock, categoria, usuario } = req.body;

    const imagen = null;
    if (req.file) {
      imagen = req.file.filename;
    }

    // Verificar que el usuario y producto existe
    const usuarioExiste = await Usuarios.findByPk(usuario);

    if (!usuarioExiste) {
      return next({
        status: 404,
        namme: "Usuario no existe. ",
        message: "El usuario debe estar registrado en la bd.",
      });
    }

    // crear el producto
    const producto = await Productos.create({
      nombre,
      imagen,
      descripcion,
      precio,
      stock,
      categoria,
      usuario,
    });
    // res.status(201).json({
    //     message: "Se ha agregado un nuevo producto"
    // });
    res.status(201).json({
      success: true,
      producto,
    });
  } catch (error) {
    next(error);
  }
};

const createCliente = async (req, res, next) => {
  try {
    const { nombre, dni, direccion, telefono, email, usuario } = req.body;

    // Verificar si el cliente y usuario ya existe
    const usuarioExiste = await Usuarios.findByPk(usuario);
    const clienteExiste = await Clientes.findOne({ where: { dni } });

    if (!usuarioExiste || clienteExiste) {
      return res.status(401).json({
        error: "El cliente o usuario no existen.",
      });
    }
    // Crear el cliente
    const clientes = await Clientes.create({
      nombre,
      dni,
      direccion,
      telefono,
      email,
      usuario,
    });
    res.status(201).json({
      success: true,
      clientes,
    });
  } catch (error) {
    next(error);
  }
};

const createProveedor = async (req, res, next) => {
  try {
    const { nombre, direccion, telefono, ruc, email, usuario } = req.body;

    // Verificar si el proveedor y usuario ya existe
    const usuarioExiste = await Usuarios.findByPk(usuario);
    const proveedorExiste = await Proveedores.findOne({ where: { ruc } });

    if (!usuarioExiste || proveedorExiste) {
      return res.status(401).json({
        error: "El proveedor o usuario no existen.",
      });
    }
    // Crear el proveedor
    const proveedor = await Proveedores.create({
      nombre,
      direccion,
      telefono,
      ruc,
      email,
      usuario,
    });
    res.status(201).json({
      success: true,
      proveedor,
    });
  } catch (error) {
    next(error);
  }
};

const registerEntradaProducto = async (req, res, next) => {
  try {
    const { userId, productId, supplierId, quantity, unitPrice } = req.body;

    // Realizar el proceso de ingreso de producto
    const transaction = await sequelize.transaction();

    // Calcular el importe
    const totalImporte = precioUnitario * cantidad;
    try {
      // Crear un registro en EntradaProductos
      const entradaProducto = await EntradaProductos.create(
        {
          fecha: new Date(),
          cantidad: quantity,
          precioUnitario: unitPrice,
          importe: totalImporte,
          usuario: userId,
          producto: productId,
          proveedor: supplierId,
        },
        { transaction }
      );

      // Actualizar el stock en Productos
      const producto = await Productos.findByPk(productId, { transaction });
      producto.stock += quantity;
      await producto.save({ transaction });

      //Confirmar la transacción
      await transaction.commit();

      res.status(201).json({
        message: "La entrada del producto se completó con éxito.",
      });
    } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const registerSalidaProducto = async (req, res, next) => {
  try {
    const { quantity, unitPrice, userId, productId, clienteId } = req.body;

    // Realizar el proceso de venta del producto
    const transaction = await sequelize.transaction();

    try {
      // Crear un registro de salida de producto
      const salidaProducto = await SalidaProductos.create(
        {
          fecha: new Date(),
          cantidad: quantity,
          precioUnitario: unitPrice,
          producto: productId,
          usuario: userId,
        },
        { transaction }
      );

      // Calcular el importe
      const totalImporte = precioUnitario * cantidad;

      //Calcular el subtotal, IGV y total para la factura
      const subTotal = cantidad * precioUnitario;
      const igv = subTotal * 0.18;
      const total = subTotal + igv;

      // Crear un registro en Factura
      const newfactura = await Facturas.create(
        {
          cantidad,
          descripcion: "Product sale",
          precioUnitario,
          importe: totalImporte,
          subTotal: subTotal,
          igv: igv,
          total: total,
          cliente: clienteId,
        },
        { transaction }
      );

      // Actualizar el stock en Productos
      const producto = await Productos.findByPk(producto, { transaction });
      producto.stock -= quantity;
      await producto.save({ transaction });

      // Confirmar la transacción
      await transaction.commit();

      res.status(201).json({
        message: "La venta del producto se completó con éxito.",
      });
    } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  loginUser,
  findAllUser,
  createProducto,
  createCliente,
  createProveedor,
  registerEntradaProducto,
  registerSalidaProducto,
};
