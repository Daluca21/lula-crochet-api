const { client } = require("../config/mercadopago");
const { Preference } = require("mercadopago");
const { URL_FRONT } = require("../config/index")

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
            }
        })
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

module.exports = {
    create
};