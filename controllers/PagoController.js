const { client } = require("../config/mercadopago");
const { Preference } = require("mercadopago");
const { URL_FRONT, URL_BACK } = require("../config/index")

const create = async (req, res) => {
    try {
        const preference = new Preference(client);

        const response = await preference.create({
            body: {
                items: [
                    {
                        title: 'Mi producto',
                        quantity: 1,
                        unit_price: 20000
                    }
                ],
                back_urls: {
                    "success": `${URL_FRONT}/api`,
                    "failure": `${URL_FRONT}/api`,
                    "pending": `${URL_FRONT}/api`
                },
                notification_url: `${URL_BACK}/pagos/webhook`
            }
        })
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const recieveWebhook = async (req, res) => {
    console.log(req);
    res.status(200).send({ success: true });
};

module.exports = {
    create,
    recieveWebhook
};