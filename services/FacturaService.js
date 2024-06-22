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

    async create(params) {
        const correo = params.correo;
        const totales = await productoService.getTotalesCarrito(correo);
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

    async confirmarPago(id) {
        const data = {
            estaPagado: true
        }
        await this.update(id, data);
    }

    async devolverProductos(id) {
        const productos = await this.findOne(id).Productos;
        productos.map(async producto => {
            const cantidad = await this.getAmountByFactura(id, producto.id);
            await this.update(id, { cantidadDisponible: producto.cantidadDisponible + cantidad });
        })
    }

    async getAmountByFactura(idFactura, idProducto) {
        const producto = await models.ProductoFactura.findOne({
            where: {
                ProductoId: idProducto,
                FacturaId: idFactura
            }
        });
        if (producto === null || producto === undefined) {
            throw new Error("No existe ese producto en esta factura");
        }
        return producto.cantidad;
    }
}

module.exports = FacturaService;