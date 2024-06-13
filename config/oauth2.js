const { google } = require("googleapis");
const { EMAIL } = require("./index");

const oAuth2Client = new google.auth.OAuth2(EMAIL.clientId, EMAIL.clientSecret, EMAIL.redirectUri);
oAuth2Client.setCredentials({refresh_token : EMAIL.refreshToken});

module.exports = oAuth2Client;