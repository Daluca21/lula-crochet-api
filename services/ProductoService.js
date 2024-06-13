const db = require("../db/index");
const { Op } = require("sequelize");
const models = db.sequelize.models;

class ProductoService {
    constructor() { }

    async find() {
        const res = await models.Producto.findAll();
        return res;
    }

    async findComplete() {
        const res = await models.Producto.findAll({ include: ['Modelo'] });
        const descuentos = res.map(async (producto) => {
            const descuento = await this.getDescuento(producto);
            producto.setDataValue('descuento', descuento);
        });
        await Promise.all(descuentos);
        return res;
    }

    async findOne(id) {
        const res = await models.Producto.findByPk(id);
        return res;
    }

    async create(data) {
        const res = await models.Producto.create(data);
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

    async getDescuento(producto) {
        const now = new Date();
        const ofertas = await producto.getOferta({
            where: {
                fechaInicio: {
                    [Op.lte]: now
                },
                fechaFin: {
                    [Op.gte]: now
                }
            },
            order: [['descuento', 'DESC']]
        });
        if (ofertas && ofertas.length > 0) {
            return ofertas[0].descuento;
        }
        return 0;
    }
}

module.exports = ProductoService;