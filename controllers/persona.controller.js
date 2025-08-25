import * as susuario from "../services/persona.service.js";

export const getAll = async function(req, res) {
    console.log("------------controller------------");
    try{
        const persona= await susuario.getAll();
        console.log("... despues de susuario.getAll()");
        res.json(persona || []);    
    }
    catch(error){
        res.status(500).json({"error":"Error obteniendo registros"});
    };
};

export const getById = async function(req, res) {
    console.log("req.params.id: "+req.params.id);
    try{
        let persona= await susuario.getById(req.params.id);
        console.log("... despues de scatalogo.getById()");
        res.json(persona || {});
    }catch(error){
        res.status(500).json({"error":"Error obteniendo registros"});
    };
};

export const create = async function(req, res) {
    const objpersona=req.body;
    console.log(objpersona);
    console.log(req.user);

    try{
        let idpersona = await susuario.create(objpersona);
        console.log("... despues de susuario.create()");
        res.json( {"idpersona":idpersona} );
    }catch(error){
    console.error("Error al crear persona:", error);

    // Si es error de Sequelize, mostrar detalles
    if (error.errors) {
        return res.status(400).json({
            message: "Error de validación",
            detalles: error.errors.map(e => ({
                campo: e.path,
                mensaje: e.message
            }))
        });
    }

    res.status(500).json({ error: "Error ingresando registros" });    
    
    };
};

export const update = function(req, res) {
    console.log("------------controller------------");
    const objpersona=req.body;
    console.log(objpersona);
    susuario.update(req.params.id, objpersona)
    .then(numRegistros => {
        console.log("... despues de susuarios.update()");
        res.json( {"numRegistros":numRegistros} );
    })
    .catch(err => {
        res.status(500).json({"error":"Error actualizando registros"});
    });
};

export const deletes = function(req, res) {
    susuario.deletes(req.params.id)
    .then(numRegistros => {
        console.log("... despues de ususarios.deletes()");
        res.json( {"numRegistros":numRegistros} );
    })
    .catch(err => {
        res.status(500).json({"error":"Error eliminando registros"});
    });
};
