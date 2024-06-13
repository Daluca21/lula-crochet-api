const { FIREBASE } = require("./index");
const { initializeApp } = require("firebase/app");

const firebase = initializeApp(FIREBASE);

module.exports = { firebase };