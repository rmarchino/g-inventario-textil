const path = require("path");
const ejs = require("ejs");
const transporter = require("./mailer");

const sendMail = (email, doc, attachments) => {
  transporter
    .sendMail({
      from: process.env.G_USER,
      to: email,
      subject: "Gestion de Inventario Textil Sur",
      text: "Si no puedes este email, ábrelo en tu navegador preterminado",
      html: doc,
      attachments,
    })
    .then(() => console.log("Mensaje enviado"))
    .catch((error) => console.log(error));
};

const sendWelcomeMail = async (email, data) => {
  // Renderizar EJS
  const filePath = path.join(__dirname, "../views/welcome/welcome.ejs");
  const doc = await ejs.renderFile(filePath, data);

  const attachments = [
    {
      filename: "illo_welcome_1.png",
      path: path.join(__dirname, "../views/welcome/images/illo_welcome_1.png"),
      cid: "welcome_image",
    },
    {
      filename: "Logo.png",
      path: path.join(__dirname, "../views/welcome/images/Logo.png"),
      cid: "logo_image",
    },
    {
      filename: "facebook2x.png",
      path: path.join(__dirname, "../views/welcome/images/facebook2x.png"),
      cid: "facebook",
    },
    {
      filename: "instagram2x.png",
      path: path.join(__dirname, "../views/welcome/images/instagram2x.png"),
      cid: "instagram",
    },
    {
      filename: "linkedin2x.png",
      path: path.join(__dirname, "../views/welcome/images/linkedin2x.png"),
      cid: "linkedin",
    },
  ];

  sendMail(email, doc, attachments);
};

module.exports = {
  sendWelcomeMail,
};
