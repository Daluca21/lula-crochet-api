const db = require("../db/index");
const { Op } = require("sequelize");
const models = db.sequelize.models;

class FacturaService {
    async find() {
        const res = await models.Factura.findAll();
        return res;
    }

    async findOne(id) {
        const res = await models.Factura.findByPk(id);
        return res;
    }

    async create(data) {
        const res = await models.Factura.create(data);
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

module.exports = FacturaService;