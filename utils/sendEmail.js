const nodemailer = require("nodemailer");
const oAuth2Client = require("../config/oauth2");
const { EMAIL } = require("../config/index");
const { Model } = require("sequelize");

const sendEmail = async (mensaje) => {
    const accessToken = oAuth2Client.getAccessToken()
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
        html: mensaje.text
    }

    try {
        return await transporter.sendMail(mailOptions);
    } catch (e) {
        console.log(e);
        throw new Error("Error al enviar el email.");
    }
};

module.exports = { sendEmail };