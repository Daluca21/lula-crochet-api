const express = require("express");
const cors = require("cors");

const { PORT } = require("./config");
const firebase = require("./config/firebase");
//const db = require("./db/index.js");
const categoriaRouter = require("./routes/CategoriaRouter");
const materialRouter = require("./routes/MaterialRouter");
const modeloRouter = require("./routes/ModeloRouter");
const fotoRouter = require("./routes/FotoRouter");
const productoRouter = require("./routes/ProductoRouter");
const ofertaRouter = require("./routes/OfertaRouter");
const usuarioRouter = require("./routes/UsuarioRouter");
const loginRouter = require("./routes/LoginRouter");
const rolRouter = require("./routes/RolRouter");

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
app.use("/api/productos", productoRouter);
app.use("/api/ofertas", ofertaRouter);
app.use("/api/usuarios", usuarioRouter);  
app.use("/api/auth", loginRouter);  
app.use("/api/rol", rolRouter);  

app.listen(PORT, () => {
    console.log(`Server start with port ${PORT}`);
});