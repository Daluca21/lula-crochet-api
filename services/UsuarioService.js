const db = require("../db/index")
const models = db.sequelize.models;
const rolDefault = 3;

class UsuarioService {
    constructor() { }

    async find(params) {
        const query = {};

        if (params) {
            query.where = params;
        }

        const res = await models.Usuario.findAll(query);
        return res;
    }

    async find() {
        const res = await models.Usuario.findAll();
        return res;
    }

    async findWithRol() {
        const res = await models.Usuario.findAll({ include: "Rol" });
        return res;
    }

    async findOne(id) {
        const res = await models.Usuario.findByPk(id);
        return res;
    }

    async create(data) {
        const res = await models.Usuario.create(data);
        return res;
    }

    async createDefault(data) {
        data.id_rol = rolDefault;
        const usuario = models.Usuario.create(data);
        return usuario;
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