const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");
//const db = require("./db/index");

const app = express();

app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());

app.get("/api", (_, res) => {
    res.json({ message: "Hello from server!" });
});   

app.get("/", (_, res) => {
    res.json({ message: "Hello from server!" });
});   

app.listen(PORT, () => {
    console.log(`Server start with port ${PORT}`);
});