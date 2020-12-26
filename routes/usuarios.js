// Ruta: /api/usuarios

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require("../controllers/usuarios");
const { validarJWT, validarAdmin, validarOwner } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getUsuarios);

router.post("/", 
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "La contraseña es obligatoria").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        validarCampos
    ],
    crearUsuario
);

router.put("/:id", 
    [
        validarJWT,
        validarOwner,
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("role", "El role es obligatorio").not().isEmpty(),
        validarCampos
    ], 
    actualizarUsuario
);

router.delete("/:id", [validarJWT, validarAdmin], borrarUsuario);

module.exports = router;