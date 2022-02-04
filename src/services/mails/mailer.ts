import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

// Exemplo
export let transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});
const handlebarOptions: any = {
  viewEngine: {
    partialsDir: path.resolve("src/views/templates"),
    defaultLayout: false,
  },
  viewPath: path.resolve("src/views/templates"),
};

transport.use("compile", hbs(handlebarOptions));
