const db = require("../db/index");
const { Op } = require("sequelize");
const models = db.sequelize.models;
const UsuarioService = require("./UsuarioService");
const ModeloService = require("./ModeloService");
const serviceUsuario = new UsuarioService();
const serviceModelo = new ModeloService();

class ProductoService {
    constructor() { }

    async getAmountByUser(correo, id) {
        const carrito = await models.Carrito.findOne({
            where: {
                ProductoId: id,
                UsuarioCorreo: correo
            }
        });
        if(carrito !== null && carrito !== undefined) return carrito.cantidad;
        return 0;
    }


}

module.exports = ProductoService;