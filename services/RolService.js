const db = require("../db/index")
const models = db.sequelize.models;

class RolService {
    constructor() { }

    async find(params) {
        const query = {};

        if (params) {
            query.where = params;
        }

        const res = await models.Rol.findAll(query);
        return res;
    }

    async find() {
        const res = await models.Rol.findAll();
        return res;
    }

    async findOne(id) {
        const res = await models.Rol.findByPk(id);
        return res;
    }

    async create(data) {
        const res = await models.Rol.create(data);
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

module.exports = RolService;