const isAdmin = (req, res, next) => {
  const { username, role } = req.user;

  if (role === "Admin") {
    return next({
      status: 401,
      name: "No eres administrador",
      message: `Lo siento ${username} solo los administradores pueden acceder aquí`,
    });
  }
  next();
};

const hasRoles = (...roles) => {
  return (res, req, next) => {
    const { username, role } = req.user;
    if (!roles.includes(role)) {
      next({
        status: 401,
        errorName: "Rol requerido",
        error: `Lo sentimos ${username} solo los administradores pueden acceder aquí`,
      });
    }
    next();
  };
};

module.exports = {
  isAdmin,
  hasRoles,
};
