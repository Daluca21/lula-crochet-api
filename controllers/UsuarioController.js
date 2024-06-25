const UsuarioService = require("../services/UsuarioService");
const TokenService = require("../services/TokenService");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { sendEmail } = require("../utils/sendEmail");
const { URL_FRONT } = require("../config");
const crypto = require("crypto");
const service = new UsuarioService();
const tokenService = new TokenService();

const register = async (req, res) => {
    try {
        const usuario = req.body.correo.split("@")[0] ?? null;
        const contrasena = req.body.contrasena;

        if (!usuario) {
            return res.status(400).json({ message: "Correo es requerido" });
        }

        const correo = req.body.correo;
        const posibleUsuario = await service.findOne(correo);

        if (posibleUsuario && posibleUsuario.verificado == true) {
            new Error("Ya existe un usuario con ese correo");
        }

        if (posibleUsuario) {
            await service.delete(correo);
        }

        req.body.contrasena = bcrypt.hashSync(contrasena, 10);

        const data = await service.createDefault(req.body);

        const token = crypto.randomBytes(20).toString('hex');
        const fechaExpiracion = Date.now() + 3600000; // 1 hora
        const tokenObj = await tokenService.create({ correo: correo, token: token, fechaExpiracion: fechaExpiracion });
        await data.addToken(tokenObj);

        const urlConfirmar = `${URL_FRONT}/ConfirmarRegistro?token=${token}`;

        await sendEmail({
            destination: data.correo,
            subject: "Confirma tu correo",
            text: `Hola ${data.nombre} ${data.apellido}, te damos la bienvenida a Lula Crochet. Por favor confirma tu correo haciendo click en el siguiente enlace: 
            ${urlConfirmar}.
            
            Recuerda que tienes un 1 hora para confirmar tu correo.`
        });

        return res.json({ success: true, data: data });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const confirmarCuenta = async (req, res) => {
    const { token } = req.params;
    try {
        const valido = await tokenService.findValids(token);
        if (valido === null || valido === undefined) {
            throw new Error("Token no existe o ya expiró");
        }
        const data = await service.activarUsuario(valido.correo);
        await sendEmail({
            destination: data.correo,
            subject: "Bienvenido a Lula Crochet",
            text: `Acabamos de confirmar tu registro en Lula Crochet. Inicia sesión en el siguiente enlace: ${URL_FRONT}/LoginRegistro`
        });
        res.status(200).json({ succes: true, token: token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const get = async (req, res) => {
    try {
        const response = await service.findWithRol();
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const create = async (req, res) => {
    try {

        const usuario = req.body.correo.split("@")[0] ?? null;
        const contrasena = req.body.contrasena;

        if (!usuario) {
            return res.status(400).json({ message: "Correo es requerido" });
        }

        req.body.contrasena = bcrypt.hashSync(contrasena, 10);

        let response;
        if (!req.body.id_rol) {
            response = await service.createDefault(req.body);
        } else {
            response = await service.create(req.body);
        }

        res.json({ success: true, data: response });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await service.findOne(id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getByCorreo = async (req, res) => {
    try {
        const { correo } = req.body;
        const response = await service.findOne(correo);
        if (response) {
            res.json({ success: true, response });
        } else {
            res.json({ success: false, response });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getAdmins = async (req, res) => {
    try {
        const response = await service.findAdmins();
        res.json({ success: true, response });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        if (body.contrasena) {
            body.contrasena = bcrypt.hashSync(body.contrasena, 10);
        }
        const response = await service.update(id, body);
        res.json({ success: true, data: response });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const _delete = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await service.delete(id);
        res.json({ success: true, data: response });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};


module.exports = {
    register,
    create,
    update,
    get,
    getById,
    getByCorreo,
    getAdmins,
    _delete,
    confirmarCuenta
}