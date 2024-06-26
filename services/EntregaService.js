const db = require("../db/index")
const models = db.sequelize.models;

class EntregaService {
    constructor() { }

    async find() {
        const res = await models.Entrega.findAll();
        return res;
    }

    async findOne(id) {
        const res = await models.Entrega.findByPk(id);
        return res;
    }

    async create(data) {
        const res = await models.Entrega.create(data);
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

    async findOneByFactura(idFactura) {
        const res = await models.Entrega.findOne({ where: { id_factura: idFactura } });
        return res;
    }
}

module.exports = EntregaService;