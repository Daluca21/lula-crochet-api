const crypto = require('crypto');
const db = require("../db/index");
const { Op } = require("sequelize");
const models = db.sequelize.models;
const ProductoService = require("../services/ProductoService");
const productoService = new ProductoService();

class FacturaService {
    async find() {
        const res = await models.Factura.findAll();
        return res;
    }

    async findOne(id) {
        const res = await models.Factura.findByPk(id);
        return res;
    }

    async create(correo) {
        const totales = await productoService.getTotalesCarrito();
        const data = {
            id_usuario: correo,
            fechaEmision: Date.now(),
            descuento: totales.totalDescuento,
            subTotal: totales.total,
            tokenDevolucion: crypto.randomBytes(16).toString('hex'),
            estaPagado: false
        }
        const factura = await models.Factura.create(data);
        const carrito = await productoService.getCarrito(correo);
        carrito.map(async producto => {
            const cantidad = await productoService.getAmountByUser(correo, producto.id);
            await factura.addProducto(producto, { through: { cantidad: cantidad } });;
        })
        return factura;
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