const UsuarioService = require("../services/UsuarioService");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const service = new UsuarioService();

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

module.exports = {
    login,
    me
}