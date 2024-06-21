const { client } = require("../config/mercadopago");
const { Preference } = require("mercadopago");
const { URL_FRONT, URL_BACK } = require("../config/index");
const FacturaService = require("../services/FacturaService");
const ProductoService = require("../services/ProductoService");
const CarritoService = require("../services/CarritoService");
const ModeloService = require("../services/ModeloService");
const service = new FacturaService();
const productoService = new ProductoService();
const carritoService = new CarritoService();
const modeloService = new ModeloService();

const create = async (req, res) => {
    try {
        const preference = new Preference(client);
        const body = req.body;
        const correo = body.correo;
        const carrito = await productoService.getCarrito(correo);
        console.log(carrito);
        const items = await Promise.all(carrito.map(async producto => {
            const modelo = await modeloService.findOne(producto.id_modelo);
            const cantidad = await carritoService.getAmountByUser(correo, producto.id);
            const descuento = await productoService.getDescuento(producto);
            return {
                title: `${modelo.nombre} ${producto.tamanio}`,
                quantity: cantidad,
                unit_price: producto.precio * (1 - descuento / 100)
            };
        }));

        const response = await preference.create({
            body: {
                items: items,
                back_urls: {
                    "success": `${URL_FRONT}/api`,
                    "failure": `${URL_FRONT}/api`,
                    "pending": `${URL_FRONT}/api`
                },
                notification_url: `${URL_BACK}/pagos/webhook`
            }
        });

        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const recieveWebhook = async (req, res) => {
    try {
        console.log(req.query);
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: error.message });
    }

};

module.exports = {
    create,
    recieveWebhook
};