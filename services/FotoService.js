const db = require("../db/index")
const models = db.sequelize.models;

class FotoService {
    constructor() { }

    async find() {
        const res = await models.Foto.findAll();
        return res;
    }

    async findOne(id) {
        const res = await models.Foto.findByPk(id);
        return res;
    }

    async create(data) {
        if (!data.hasOwnProperty("url") || !data.hasOwnProperty("tamanio")) {
            let msg = "Formato incorrecto para añadir crear una factura. Hace falta:";
            if (!data.hasOwnProperty("url")) {
                msg += "\nAgregar la propiedad 'url' de la foto. Probablemente hubo un error al crear el enlace";
            }
            if (!data.hasOwnProperty("tamanio")) {
                msg += "\nAgregar la propiedad 'tamanio' del tamaño de referencia de la foto";
            }
            throw new Error(msg);
        }
        const res = await models.Foto.create(data);
        return res;
    }

    async update(id, data) {
        const model = await this.findOne(id);
        const res = await model.update(data);
        return res;
    }

    async delete(id) {
        const model = await this.findOne(id);
        console.log(model);
        if(model === null){
            throw new Error(`No existe imagen con id ${id}`);
        }
        await model.destroy();
        return { deleted: true };
    }
}

module.exports = FotoService;