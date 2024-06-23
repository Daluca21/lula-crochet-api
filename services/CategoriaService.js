const db = require("../db/index")
const models = db.sequelize.models;
const ModeloService = require("../services/ModeloService");
const modeloService = new ModeloService();

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
        if (!data.hasOwnProperty("nombre")) {
            let msg = `Es necesario indicar el nombre de la categoría`;
            throw new Error(msg);
        }
        data.nombre = data.nombre.toUpperCase();
        const res = await models.Categoria.create(data);
        return res;
    }

    async update(id, data) {
        if (!data.hasOwnProperty("nombre")) {
            let msg = `Es necesario indicar el nombre de la categoría`;
            throw new Error(msg);
        }
        const model = await this.findOne(id);
        const res = await model.update(data);
        return res;
    }

    async delete(id) {
        const modelos = await modeloService.findByCategoria(id);
        if(modelos.length > 0){
            throw new Error(`Existen ${modelos.length} modelo(s) que tiene esta categoría asignada. No es posible realizar la eliminación.`)
        }
        const model = await this.findOne(id);
        await model.destroy();
        return { deleted: true };
    }
}

module.exports = CategoriaService;