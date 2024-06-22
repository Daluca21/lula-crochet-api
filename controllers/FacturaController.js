const { client } = require("../config/mercadopago");
const { Preference, MerchantOrder, Payment } = require("mercadopago");
const { URL_FRONT, URL_BACK } = require("../config/index");
const FacturaService = require("../services/FacturaService");
const ProductoService = require("../services/ProductoService");
const ModeloService = require("../services/ModeloService");
const { or } = require("sequelize");
const service = new FacturaService();
const productoService = new ProductoService();
const modeloService = new ModeloService();

const create = async (req, res) => {
    try {
        const preference = new Preference(client);
        const body = req.body;
        const correo = body.correo;
        const carrito = await productoService.getCarrito(correo);

        const items = await Promise.all(carrito.map(async producto => {
            const modelo = await modeloService.findOne(producto.id_modelo);
            const cantidad = await productoService.getAmountByUser(correo, producto.id);
            const descuento = await productoService.getDescuento(producto);
            return {
                title: `${modelo.nombre} ${producto.tamanio}`,
                quantity: cantidad,
                unit_price: producto.precio * (1 - descuento / 100)
            };
        }));

        //crear factura
        const params = {
            correo: correo
        }
        const factura = await service.create(params);

        //crear preferencia en MercadoPago
        const response = await preference.create({
            body: {
                items: items,
                back_urls: {
                    "success": `${URL_FRONT}/api`,
                    "failure": `${URL_FRONT}/api`,
                    "pending": `${URL_FRONT}/api`
                },
                notification_url: `${URL_BACK}/facturas/webhook`,
                external_reference: factura.id
            }
        });

        //eliminar carrito
        await productoService.cleanCarrito(correo);

        res.json({factura, response});
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const recieveWebhook = async (req, res) => {
    try {
        const body = req.body;
        if (body.topic !== null && body.topic !== undefined && body.topic === 'merchant_order') {
            const merchantOrder = new MerchantOrder(client);
            const segments = body.resource.split('/');
            const ordenDePago = await merchantOrder.get({ merchantOrderId: segments[segments.length - 1] });
            const status = ordenDePago.status;
            const idFactura = ordenDePago.external_reference;
            if (status === 'closed') {
                console.log(idFactura);
                console.log(ordenDePago);
                await service.confirmarPago(idFactura);
            } else if (status === 'expired') {
                await service.devolverProductos(idFactura);
            }
        }
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