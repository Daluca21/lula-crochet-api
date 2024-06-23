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
        if (!params.hasOwnProperty("correo")) {
            let msg = "Formato incorrecto para añadir crear una factura. Hace falta:";
            if (!params.hasOwnProperty("correo")) {
                msg += "\nAgregar la propiedad 'correo' del usuario";
            }
            throw new Error(msg);
        }
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
        const factura = await this.findOne(id);
        const productos = await factura.getProductos();
        if (!productos || productos.length === 0) {
            throw new Error("No hay productos en esta factura");
        }
        productos.map(async producto => {
            const cantidad = await this.getAmountByFactura(id, producto.id);
            await productoService.update(producto.id, { cantidadDisponible: producto.cantidadDisponible + cantidad });
        });
    }

    async getAmountByFactura(idFactura, idProducto) {
        const producto = await models.Producto_Factura.findOne({
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