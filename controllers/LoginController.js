const UsuarioService = require("../services/UsuarioService");
const RolService = require("../services/RolService");
const models = require("../db/index").sequelize.models;

const service = new UsuarioService();
const rolService = new RolService();

const login = (req, res) => {

};

const me = (req, res) => {
    
}