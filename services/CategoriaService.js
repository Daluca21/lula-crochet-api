const db = require("../db/index")
const models = db.sequelize.models;

class CategoriaService {
    constructor() { }

    async find() {
        const res = await models.Categoria.findAll();
        return res;
    }

    async findOne(id) {
        const res = await models.Categoria.findByPk(id);
        return res;
    }

    async create(data) {
        const res = await models.Categoria.create(data);
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

module.exports = CategoriaService;