const db = require("../db/index")
const { Op } = require("sequelize");
const models = db.sequelize.models;
const rolDefault = 0;

class UsuarioService {
    constructor() { }

    async find(params) {
        const query = {};

        if (params) {
            query.where = params;
        }
        query.attributes = { exclude: ['contrasena'] }
        const res = await models.Usuario.findAll(query);
        return res;
    }

    async find() {
        const res = await models.Usuario.findAll();
        return res;
    }

    async findWithRol() {
        const res = await models.Usuario.findAll({
            include: "Rol",
            attributes: {
                exclude: ['contrasena']
            }
        });
        return res;
    }

    async findAdmins() {
        const res = await models.Usuario.findAll({
            where: {
                'id_rol': { [Op.ne]: 0 },
            },
            attributes: {
                exclude: ['contrasena']
            }
        });
        return res;
    }

    async findOne(id) {
        const res = await models.Usuario.findByPk(id, {
            include: {
                model: models.Producto,
                through: {
                    attributes: ["cantidad"],
                },
            }
        });
        return res;
    }

    async create(data) {
        const res = await models.Usuario.create(data);
        return res;
    }

    async createDefault(data) {
        data.id_rol = rolDefault;
        data.verificado = false;
        const usuario = await models.Usuario.create(data);
        return usuario;
    }

    async activarUsuario(correo) {
        const res = await this.update(correo, { verificado: true });
        return res;
    }

    async update(id, data) {
        const model = await this.findOne(id);
        const res = await model.update(data);
        return res;
    }

    async delete(id) {
        const model = await this.findOne(id);
        await model.destroy();
        return { deleted: true };
    }
}

module.exports = UsuarioService;