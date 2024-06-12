const express = require("express");
const cors = require("cors");

const { PORT } = require("./config");
const categoriaRouter = require("./routes/CategoriaRouter");
const materialRouter = require("./routes/MaterialRouter");
const modeloRouter = require("./routes/ModeloRouter");
const fotoRouter = require("./routes/FotoRouter");

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
 
app.use("/api/categorias", categoriaRouter);
app.use("/api/materiales", materialRouter);
app.use("/api/modelos", modeloRouter);
app.use("/api/fotos", fotoRouter);   

app.listen(PORT, () => {
    console.log(`Server start with port ${PORT}`);
});