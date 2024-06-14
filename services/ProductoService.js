const db = require("../db/index");
const { Op } = require("sequelize");
const models = db.sequelize.models;
const UsuarioService = require("./UsuarioService");
const serviceUsuario = new UsuarioService();

class ProductoService {
    constructor() { }

    async find() {
        const res = await models.Producto.findAll();
        return res;
    }

    async findComplete() {
        console.log("a");
        const res = await models.Producto.findAll({
            include: {
                model: models.Modelo,
                include : models.Categoria
            }
        });
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

    async addToCarrito(data) {
        if (!data.hasOwnProperty("id_usuario") || !data.hasOwnProperty("id_producto") || !data.hasOwnProperty("cantidad")) {
            let msg = "Formato incorrecto para añadir un producto al carrito del usuario. Hace falta:";
            if(!data.hasOwnProperty("id_usuario")) {
                msg += "\nAgregar la propiedad 'id_usuario' con el valor de id del usuario.";
            }
            if(!data.hasOwnProperty("id_producto")) {
                msg += "\nAgregar la propiedad 'id_producto' con el valor de id del producto que desea añadir al carrito.";
            }
            if(!data.hasOwnProperty("cantidad")) {
                msg += "\nAgregar la propiedad 'cantidad' con el valor de la cantidad de productos que desea.";
            }
            throw new Error(msg);
        }
        const usuario = await serviceUsuario.findOne(data["id_usuario"]);
        const producto = await this.findOne(data["id_producto"]);
        const res = await usuario.addProducto(producto, { through: { cantidad: data["cantidad"] } });;
        return res;
    }

    async removeToCarrito(correo, id) {
        const model = await models.Carrito.findOne({
            where: { 
                ProductoId: id,
                UsuarioCorreo: correo
            }
        });
        await model.destroy();
        return { deleted: true };
    }

}

module.exports = ProductoService;