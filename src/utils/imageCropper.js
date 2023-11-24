const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const cropImageProduct = async (req, res, next) => {
  try {
    if (req.file) {
      const imagePath = req.file.path;

      const directorioPadre = path.dirname(imagePath);

      const rutaImageCrop = path.join(
        directorioPadre,
        "recortada-" + req.file.filename
      );

      await sharp(imagePath).resize(400, 300).toFile(rutaImageCrop);

      //Elimnar el archivo original
      fs.unlinkSync(imagePath);

      //Actualizar la ruta del archivo con la imagen recortada
      req.file.path = rutaImageCrop;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  cropImageProduct,
};
