const { getStorage } = require("firebase/storage");
const { FIREBASE } = require("./index");
const { initializeApp } = require("firebase/app");

const firebase = initializeApp(FIREBASE);
const storage = getStorage(firebase);

module.exports = { storage };