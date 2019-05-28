'use strict'

const nodemailer = require("nodemailer");
const {
  transporter
} = require('../../Helpers/Email');


const emailBody = ({
  qtdProdutos
}) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Thimble Sample</title>
  <!--    <link rel="stylesheet" href="style.css">-->
      <style>
        /* Fonts from Google Fonts - more at https://fonts.google.com */
        @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');
        @import url('https://fonts.googleapis.com/css?family=Merriweather:400,700');

        body {
          background-color: white;
          font-family: "Open Sans", sans-serif;
          padding: 5px 25px;
          font-size: 18px;
          margin: 0;
          color: #444;
        }

        h1 {
          font-family: "Merriweather", serif;
          font-size: 32px;
        }

      </style>
    </head>
    <body>
      <style>
      span, a {
        border: none;
        background: #00a232;
        font-size: 12px;
        padding: 2%;
        color: #fff;
        text-decoration: none;
      }
      </style>
      <h1>Solicitacao de produtos</h1>
        <p>Solicitamos a entrega de ${qtdProdutos} produtos</p>
        </body>
        </html>

        <a href="https://327715.playcode.io/?action=ADD&value=${qtdProdutos}"><span>Adicionar ao estoque</span></a>
        `;
      }

class EmailController {

  async sendEmailEstoque({ request }) {
    const {
      value
    } = request.get();

    const transp = await transporter();
    const info = await transp.sendMail({
      from: 'erp@soudev.tech',
      to: 'jeferson.passosf@gmail.com',
      subject: 'Solicitacao de estoque',
      html: emailBody({
        qtdProdutos: value
      })
    })

    return info;
  }

  sendEmailAprovacao({
    request
  }) {

  }

}

module.exports = EmailController


// async..await is not allowed in global scope, must use a wrapper
async function main() {

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
