const { response } = require("express");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
                                    .populate("usuario", "nombre")
                                    .populate("hospital", "nombre");

    res.json({
        ok: true,
        medicos
    });

}

const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
        
    }

}

const actualizarMedico = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medicoDB = await Medico.findById( id );

        if( !medicoDB ) {
            return res.status(404).json({
                ok: false,
                msg: "Medico id no encontrado"
            });
        }

        const hospitalID = req.body.hospital;
        const hospitalDB = await Hospital.findById( hospitalID );

        if( !hospitalDB ) {
            return res.status(404).json({
                ok: false,
                msg: "Hospital id no encontrado"
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true});

        res.json({
            ok: true,
            msg: "actualizarHospital",
            hospital: medicoActualizado
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
        
    }

}

const borrarMedico = async(req, res = response) => {

    const id = req.params.id;

    try {

        const medicoDB = await Medico.findById( id );

        if( !medicoDB ) {
            return res.status(404).json({
                ok: false,
                msg: "Medico id no encontrado"
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: "Medico eliminado",
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
        
    }

}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}