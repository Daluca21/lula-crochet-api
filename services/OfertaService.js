const db = require("../db/index")
const models = db.sequelize.models;
const ProductoService = require("./ProductoService");
const serviceProducto = new ProductoService();

class OfertaService {
    constructor() { }

    async find() {
        const res = await models.Oferta.findAll({
            include: {
                model: models.Producto,
                through: models.Producto_Oferta,
                include: {
                    model: models.Modelo,
                    include: [
                        {
                            model: models.Foto,
                            through: models.Modelo_Foto
                        }
                    ]
                }
            }
        });
        return res;
    }

    async findOne(id) {
        const res = await models.Oferta.findByPk(id, {
            include: {
                model: models.Producto,
                through: models.Producto_Oferta,
                include: {
                    model: models.Modelo,
                    include: [
                        {
                            model: models.Foto,
                            through: models.Modelo_Foto
                        }
                    ]
                }
            }
        });
        return res;
    }

    async create(data) {
        if (!data.hasOwnProperty("id_productos")) {
            let msg = ```Formato incorrecto para crear una oferta
            \nDebe agregar la propiedad 'id_productos' junto con los id de los productos asociados```
            throw new Error(msg);
        }
        //Agregar la validación de la existencia de cada producto
        const oferta = await models.Oferta.create(data.oferta);
        data.id_productos.forEach(async (id) => {
            const producto = await serviceProducto.findOne(id);
            await oferta.addProducto(producto);
        });
        return oferta;
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

module.exports = OfertaService;