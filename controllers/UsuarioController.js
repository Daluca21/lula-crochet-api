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

        return res.json({ success: true, data: data });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "No auth" });
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
        if(!req.body.id_rol){
            response = service.createDefault(req.body);
        }else{
            response = service.create(req.body);
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
        if(response){
            res.json({success: true, response});
        }else{
            res.json({success: false, response});
        }
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getAdmins = async (req, res) => {
    try {
        const response = await service.findAdmins();
        res.json({success: true, response});
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        if(body.contrasena){
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
    _delete
}