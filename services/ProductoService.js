const db = require("../db/index");
const { Op } = require("sequelize");
const models = db.sequelize.models;

class ProductoService {
    constructor() { }

    async find() {
        const res = await models.Producto.findAll();
        return res;
    }

    async findComplete(params) {
        const query = {
            where: {},
            include: [
                {
                    model: models.Modelo,
                    include: models.Categoria
                }
            ]
        };

        if (params) {
            query.where = params;
        }

        const res = await models.Producto.findAll(query);
        const descuentos = res.map(async (producto) => {
            const descuento = await this.getDescuento(producto);
            producto.setDataValue('descuento', descuento);
        });
        await Promise.all(descuentos);
        return res;
    }

    async findWithOferta() {
        const query = {
            include: [
                {
                    model: models.Modelo,
                    include: models.Categoria
                }
            ]
        };

        const res = await models.Producto.findAll(query);

        const productosConDescuento = [];
        const descuentos = res.map(async (producto) => {
            const descuento = await this.getDescuento(producto);
            if (descuento > 0) {
                producto.setDataValue('descuento', descuento);
                productosConDescuento.push(producto);
            }
        });

        await Promise.all(descuentos);
        return productosConDescuento;
    }

    async findByCategoria(id) {
        const query = {
            where: {},
            include: [
                {
                    model: models.Modelo,
                    where: {
                        'id_categoria': id
                    },
                    right: true,
                    include: models.Categoria
                }
            ]
        };

        const res = await models.Producto.findAll(query);
        const descuentos = res.map(async (producto) => {
            const descuento = await this.getDescuento(producto);
            producto.setDataValue('descuento', descuento);
        });
        await Promise.all(descuentos);
        return res;
    }

    async findOne(id) {
        const res = await models.Producto.findByPk(id);
        const descuento = await this.getDescuento(res);
        res.setDataValue('descuento', descuento);
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

    async getOfertasById(id) {
        const now = new Date();
        const producto = await this.findOne(id);
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
        return ofertas;
    }
}

module.exports = ProductoService;