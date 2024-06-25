const { client } = require("../config/mercadopago");
const { Preference, MerchantOrder, Payment } = require("mercadopago");
const { URL_FRONT, URL_BACK } = require("../config/index");
const FacturaService = require("../services/FacturaService");
const ProductoService = require("../services/ProductoService");
const ModeloService = require("../services/ModeloService");
const EntregaService = require("../services/EntregaService");
const { sendEmail } = require("../utils/sendEmail");
const { or } = require("sequelize");
const service = new FacturaService();
const productoService = new ProductoService();
const modeloService = new ModeloService();
const entregaService = new EntregaService();
const facturaService = new FacturaService();

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
                    "success": `${URL_FRONT}/PagoExitoso`,
                    "failure": `${URL_FRONT}/PagoExitoso`,
                    "pending": `${URL_FRONT}/PagoExitoso`
                },
                notification_url: `${URL_BACK}/facturas/webhook`,
                external_reference: factura.id
            }
        });

        //eliminar carrito
        await productoService.cleanCarrito(correo);

        //crear Entrega
        const entrega = await entregaService.create({
            id_factura: factura.id,
            estado: 'creado',
            municipio: body.municipio,
            departamento: body.departamento,
            direccion: body.direccion,
        });
        console.log(response);
        res.json({ factura, entrega, linkDePago: response.init_point });
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
            const factura = await facturaService.findOne(idFactura);
            if (status === 'closed') {
                if (factura.estaPagado !== true) {
                    await service.confirmarPago(idFactura);

                    //Cambiar estado entrega
                    const entrega = await entregaService.findOneByFactura(idFactura);
                    await entrega.update({ estado: "solicitado" });

                    //Enviar correo de confirmación compra
                    const correo = factura.id_usuario;
                    const subject = `Tu pago fue exitoso`;
                    const text = `Nos complace informarle que su pago se ha realizado exitosamente. Agradecemos su compra y confianza en nosotros. En breve, procesaremos su pedido y le notificaremos cuando el envío de sus productos haya comenzado. Puede esperar recibir otra notificación con la información de seguimiento del envío para que pueda estar al tanto del estado de su pedido`;
                    await sendEmail({
                        destination: correo,
                        subject: subject,
                        text: text
                    });

                }
            } else if (status === 'expired') {
                await service.devolverProductos(idFactura);

                //Eliminar entrega
                await entregaService.delete(idFactura);
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