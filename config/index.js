require("dotenv").config();

const PORT = process.env.PORT || 8080;
const MODE = process.env.MODE || "dev";
const SECRET_KEY = process.env.SECRET_KEY || "unaLLaveSecretaM";

module.exports = {
    PORT,
    MODE,
    SECRET_KEY,
    // EMAIL,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    TABLE_NAMES: process.env.TABLE_NAMES
};
