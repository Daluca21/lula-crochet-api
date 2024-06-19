require("dotenv").config();

const PORT = process.env.PORT || 8080;
const MODE = process.env.MODE || "dev";
const SECRET_KEY = process.env.SECRET_KEY || "unaLLaveSecretaM";

const FIREBASE = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

const EMAIL = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    refreshToken: process.env.REFRESH_TOKEN,
    user: process.env.EMAIL_USER,
    service: process.env.EMAIL_SERVICE
}

module.exports = {
    PORT,
    MODE,
    EMAIL,
    FIREBASE,
    SECRET_KEY,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    URL_FRONT: process.env.URL_FRONT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    TABLE_NAMES: process.env.TABLE_NAMES
};
