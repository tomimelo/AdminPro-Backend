// Ruta: "/api/medicos"

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT } = require("../middlewares/validar-jwt");

const {
    getMedicos,
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require("../controllers/medicos");

const router = Router();

router.get("/", validarJWT, getMedicos);
router.get("/:id", validarJWT, getMedico);

router.post("/", 
    [
        validarJWT,
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("hospital", "El hospital id debe ser valido").isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put("/:id", 
    [
        validarJWT,
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("hospital", "El hospital id debe ser valido").isMongoId(),
        validarCampos
    ], 
    actualizarMedico
);

router.delete("/:id", validarJWT, borrarMedico);

module.exports = router;