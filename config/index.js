require("dotenv").config();

const PORT = process.env.PORT || 8080;
const MODE = process.env.MODE || "dev";

module.exports = {
    PORT,
    MODE,
};
