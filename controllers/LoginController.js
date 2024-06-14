const UsuarioService = require("../services/UsuarioService");
const TokenService = require("../services/TokenService");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { SECRET_KEY, URL_FRONT } = require("../config");
const { sendEmail } = require("../utils/sendEmail");
const service = new UsuarioService();
const tokenService = new TokenService();

const login = (req, res) => {
    try {
        const usuario = req.body.correo.split("@")[0] ?? null;
        const contrasena = req.body.contrasena;

        if (!usuario || !contrasena) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const correo = req.body.correo;
        return service.findOne(correo).then((user) => {
            if (!user) {
                res.status(500).json({ success: false, message: "Usuario no existe" });
            } else {
                bcrypt.compare(contrasena, user.contrasena, function (err, resp) {
                    if (err) {
                        return res.status(401).json({ message: "Authentication failed" });
                    }
                    if (resp) {
                        const token = jwt.sign({ correo }, SECRET_KEY, { expiresIn: "1h" });
                        user.contrasena = "";
                        return res.json({ success: true, token: token, data: user });
                    } else {
                        return res.status(401).json({ message: "Authentication failed" });
                    }
                });
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "No auth" });
    }
};

const me = async (req, res) => {
    try {
        res.status(200).json({ correo: req.correo });
    } catch (error) {
        res.status(500).json({ success: false, message: "No auth" });
    }
};

const solicitarToken = async (req, res) => {
    try {
        const { correo } = req.body;
        const user = await service.findOne(correo);
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }
        const token = crypto.randomBytes(20).toString('hex');
        const fechaExpiracion = Date.now() + 3600000; // 1 hora
        const tokenObj = await tokenService.create({ correo: correo, token: token, fechaExpiracion: fechaExpiracion });
        user.addToken(tokenObj);

        const enlace = `${URL_FRONT}/ReestablecerContrasena?token=${token}`
        const mensaje = `
        Hola, Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si realizaste esta solicitud, haz clic en el siguiente enlace para restablecer tu contraseña:
                        
        ${enlace}
                        
        Si no solicitaste un restablecimiento de contraseña, por favor ignora este correo. Tu contraseña actual permanecerá sin cambios y no es necesario que realices ninguna acción adicional.`

        sendEmail({
            destination: correo,
            subject: "Cambio de contraseña",
            text: mensaje
        })

        res.status(200).json({ succes: true, message: 'Correo de restablecimiento de contraseña enviado' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const verificarToken = async (req, res) => {
    const { token } = req.params;
    try {
        const valido = await tokenService.isValid(token);
        if(!valido){
           return  new Error("Token no existe o ya expiró");
        }
        res.status(200).json({ succes: true, token: token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const cambiarContrasena = async (req, res) => { };

module.exports = {
    login,
    me,
    solicitarToken,
    verificarToken,
    cambiarContrasena
}