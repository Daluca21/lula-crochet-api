const express = require("express");
const { PORT } = require("./config");

const app = express();

app.get("/api", (_, res) => {
    res.json({ message: "Hello from server!" });
});   

app.listen(PORT, () => {
    console.log(`Server start with port ${PORT}`);
});