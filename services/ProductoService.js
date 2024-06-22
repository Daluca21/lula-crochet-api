const db = require("../db/index");
const { Op } = require("sequelize");
const models = db.sequelize.models;
const UsuarioService = require("./UsuarioService");
const ModeloService = require("./ModeloService");
const serviceUsuario = new UsuarioService();
const serviceModelo = new ModeloService();

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
                    include: [
                        {
                            model: models.Categoria
                        },
                        {
                            model: models.Foto,
                            through: models.Modelo_Foto
                        },
                        {
                            model: models.Material,
                            through: models.Modelo_Material
                        }
                    ]
                }
            ]
        };

        if (params) {
            query.where = params;
        }

        const res = await models.Producto.findAll(query);
        const descuentosYFotos = res.map(async (producto) => {
            const descuento = await this.getDescuento(producto);
            const fotos = await serviceModelo.getFotos(producto.id_modelo);
            producto.setDataValue('descuento', descuento);
            producto.setDataValue('fotos', fotos);
        });

        await Promise.all(descuentosYFotos);

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
            const fotos = await serviceModelo.getFotos(producto.id_modelo);
            if (descuento > 0) {
                producto.setDataValue('descuento', descuento);
                producto.setDataValue('fotos', fotos);
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
            const fotos = await serviceModelo.getFotos(producto.id_modelo);
            producto.setDataValue('descuento', descuento);
            producto.setDataValue('fotos', fotos);
        });
        await Promise.all(descuentos);
        return res;
    }

    async findOne(id) {
        const query = {
            where: {},
            include: [
                {
                    model: models.Modelo,
                    include: [
                        {
                            model: models.Categoria
                        },
                        {
                            model: models.Foto,
                            through: models.Modelo_Foto
                        },
                        {
                            model: models.Material,
                            through: models.Modelo_Material
                        }
                    ]
                }
            ]
        };
        const res = await models.Producto.findByPk(id, query);
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


    //Carrito

    async addToCarrito(data) {
        if (!data.hasOwnProperty("id_usuario") || !data.hasOwnProperty("id_producto") || !data.hasOwnProperty("cantidad")) {
            let msg = "Formato incorrecto para añadir un producto al carrito del usuario. Hace falta:";
            if (!data.hasOwnProperty("id_usuario")) {
                msg += "\nAgregar la propiedad 'id_usuario' con el valor de id del usuario.";
            }
            if (!data.hasOwnProperty("id_producto")) {
                msg += "\nAgregar la propiedad 'id_producto' con el valor de id del producto que desea añadir al carrito.";
            }
            if (!data.hasOwnProperty("cantidad")) {
                msg += "\nAgregar la propiedad 'cantidad' con el valor de la cantidad de productos que desea.";
            }
            throw new Error(msg);
        }

        const idProducto = data["id_producto"];
        const correo = data["id_usuario"];
        const cantidad = data["cantidad"];

        const usuario = await serviceUsuario.findOne(correo);
        const producto = await this.findOne(idProducto);

        const carrito = await models.Carrito.findOne({
            where: {
                ProductoId: idProducto,
                UsuarioCorreo: correo
            }
        });

        let cantidadAntigua = 0;
        let cantidadDisponible = producto.cantidadDisponible;

        if (carrito !== null) {
            cantidadAntigua = carrito.cantidad;
        }

        if ((cantidad - cantidadAntigua) > cantidadDisponible || cantidad < 0) {
            let msg = "Error en las cantidades: ";
            if ((cantidad - cantidadAntigua) > cantidadDisponible) {
                msg += "\nNo hay suficientes unidades en el inventario";
            }
            if (cantidad < 0) {
                msg += "\nCantidad negativa";
            }
            throw new Error(msg);
        }

        if (carrito !== null) {
            await this.removeToCarrito(correo, idProducto);
            cantidadDisponible = cantidadDisponible + cantidadAntigua;
        }

        await this.update(idProducto, { cantidadDisponible: cantidadDisponible - cantidad });
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
        let cantidadAntigua = model.cantidad;
        const producto = await this.findOne(id);
        let cantidadDisponible = producto.cantidadDisponible;
        await this.update(id, { cantidadDisponible: cantidadDisponible + cantidadAntigua });
        await model.destroy();
        return { deleted: true };
    }

    async cleanCarrito(correo) {
        await models.Carrito.destroy({
            where: {
                UsuarioCorreo: correo
            }
        });
        return { deleted: true };
    }

    async getCarrito(correo) {
        const usuario = await serviceUsuario.findOne(correo);
        return usuario.Productos;
    }

    async getAmountByUser(correo, id) {
        const carrito = await models.Carrito.findOne({
            where: {
                ProductoId: id,
                UsuarioCorreo: correo
            }
        });
        if (carrito === null || carrito === undefined) {
            throw new Error("No existe ese producto en el carrito");
        }
        return carrito.cantidad;
    }

    async getTotalesCarrito(correo) {
        const carrito = await this.getCarrito(correo);
        if (!carrito || carrito.length === 0) {
            throw new Error("No hay productos en el carrito");
        }

        let total = 0;
        let totalDescuento = 0;

        await Promise.all(carrito.map(async producto => {
            const cantidad = await this.getAmountByUser(correo, producto.productoId);
            const descuento = await this.getDescuento(producto); 

            total += producto.precio * cantidad;
            totalDescuento += (producto.precio * cantidad) * (descuento / 100);
        }));

        return { total, totalDescuento };
    }


    //Ofertas

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