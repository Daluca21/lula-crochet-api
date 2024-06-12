const db = require("../db/index")
const models = db.sequelize.models;

class ModeloService {
    constructor() { }

    async find() {
        const res = await models.Modelo.findAll();
        return res;
    }

    async findOne(id) {
        const res = await models.Modelo.findByPk(id);
        return res;
    }

    async create(data) {
        const modelo = await models.Modelo.create(data);
        data.materiales.forEach(async (id_material) => {
            const material = await models.Material.findByPk(id_material);
            modelo.addMaterial(material); 
        });
        return modelo;
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

module.exports = ModeloService;