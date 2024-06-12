const UsuarioService = require("../services/UsuarioService");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const service = new UsuarioService();

const register = (req, res) => {
    try {
        const usuario = req.body.correo.split("@")[0] ?? null;
        const contrasena = req.body.contrasena;
        
        if (!usuario) {
          return res.status(400).json({ message: "Correo es requerido" });
        }

        req.body.contrasena = bcrypt.hashSync(contrasena, 10);
        const correo = req.body.correo;
        const data = service.createDefault(req.body);

        const token = jwt.sign({ correo }, SECRET_KEY, { expiresIn: "1h" });
        return res.json({ success: true, token: token , data: data});

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "No auth" });
    }
};

module.exports = {
    register
}