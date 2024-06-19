const { MercadoPagoConfig } = require("mercadopago");
const { ACCESS_TOKEN } = require("../config/index");

const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });

module.exports = { client }
