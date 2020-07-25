require("dotenv").config(); //Variables de entorno

const express = require("express");
var cors = require("cors");

const { dbConnection } = require("./db/config");

//Express Initilization
const app = express(); //Crear el servidor express

//CORS Configuration
app.use( cors() );

dbConnection();

//Rutas
app.get("/", (req,res) => {
    res.json({
        ok: true,
        msg: "Hola Mundo!"
    });
});

app.listen(process.env.PORT, () => {
    console.log("Servidor running on port " + process.env.PORT);
});