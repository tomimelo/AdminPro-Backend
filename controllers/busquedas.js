const { response } = require("express");
const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const getBusquedaGeneral = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, "i");

    const [usuarios, medicos, hospitales] = await Promise.all([

        Usuario.find({nombre: regex}),
        Medico.find({nombre: regex}),
        Hospital.find({nombre: regex})

    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });

}

const getBusquedaColeccion = async(req, res = response) => {

    const coleccion = req.params.coleccion;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, "i");

    let data = [];

    switch (coleccion) {
        case "medicos":
            data = await Medico.find({nombre: regex});
        break;

        case "hospitales":
            data = await Hospital.find({nombre: regex});
        break;

        case "usuarios":
            data = await Usuario.find({nombre: regex});
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: "La coleccion tiene que ser usuarios/medicos/hospitales"
            });
    }

    res.json({
        ok: true,
        resultados: data
    });

}



module.exports = {
    getBusquedaGeneral,
    getBusquedaColeccion
}