//Ruta "/api/todo"

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
    getBusquedaGeneral,
    getBusquedaColeccion
} = require("../controllers/busquedas");

const router = Router();

router.get("/:busqueda", validarJWT, getBusquedaGeneral);
router.get("/coleccion/:coleccion/:busqueda", validarJWT, getBusquedaColeccion);


module.exports = router;