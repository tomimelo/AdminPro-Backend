require("dotenv").config(); //Variables de entorno

const express = require("express");
var cors = require("cors");

const { dbConnection } = require("./db/config");

//Express Initilization
const app = express(); //Crear el servidor express

//CORS Configuration
app.use( cors() );

//Lectura y parseo del body
app.use( express.json() );

dbConnection();

//Rutas
app.use("/api/usuarios", require("./routes/usuarios") );
app.use("/api/hospitales", require("./routes/hospitales") );
app.use("/api/medicos", require("./routes/medicos") );
app.use("/api/login", require("./routes/auth") );
app.use("/api/todo", require("./routes/busquedas") );
app.use("/api/upload", require("./routes/uploads") );

app.listen(process.env.PORT, () => {
    console.log("Servidor running on port " + process.env.PORT);
});