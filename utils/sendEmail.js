const nodemailer = require("nodemailer");
const oAuth2Client = require("../config/oauth2");
const { EMAIL } = require("../config/index");
const { Model } = require("sequelize");

const HTML_TEMPLATE = (subject, children) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                width: 100%;
                max-width: 600px;
                margin: auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .email-header {
                background-color: #4CAF50;
                color: #ffffff;
                padding: 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
            }
            .email-header h1 {
                margin: 0;
            }
            .email-body {
                padding: 20px;
                color: #333333;
            }
            .email-body p {
                line-height: 1.6;
            }
            .email-footer {
                background-color: #f4f4f4;
                padding: 20px;
                text-align: center;
                border-radius: 0 0 8px 8px;
                font-size: 12px;
                color: #888888;
            }
            .email-footer a {
                color: #4CAF50;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-body">
                ${children}
                <p>Si tienes alguna duda o sugerencia, no dudes en contactar con nosotros.</p>
                <p>Lula Crochet</p>
            </div>
        </div>
    </body>
    </html> 
    `
};

const sendEmail = async (mensaje) => {
    try {
        const accessToken = oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: EMAIL.user,
                service: EMAIL.service,
                clientId: EMAIL.clientId,
                clientSecret: EMAIL.clientSecret,
                refreshToken: EMAIL.refreshToken,
                accessToken: accessToken
            }
        })
        const mailOptions = {
            from: EMAIL.user,
            to: mensaje.destination,
            subject: mensaje.subject,
            text: mensaje.text,
            html: HTML_TEMPLATE(mensaje.subject, mensaje.text)
        }
        return await transporter.sendMail(mailOptions);
    } catch (e) {
        console.log(e);
        throw new Error("Error al enviar el email.");
    }
};

module.exports = { sendEmail };