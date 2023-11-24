const multer = require("multer");
const path = require("path");

const types = ["image/jpeg", "image/jpg", "image/png"];

const uploadImageProduct = multer({
  storage: multer.diskStorage({
    destination: path.resolve("../src/images"),
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
  limits: {
    fileSize: 20000000,
  },
  fileFilter: (req, file, cb) => {
    if (!types.includes(file.mimetype)) {
      return cb(null, false, {
        error: "Archivo no soportado",
        message: `El archivo debe tener una extensión válida ${types.join(
          ", "
        )}`,
      });
    }
    cb(null, true);
  },
});

module.exports = {
  uploadImageProduct,
};
