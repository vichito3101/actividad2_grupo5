
import fs from 'fs';
import * as scatalogo from "../services/catalogo.service.js";
import * as sfile from "../services/file.service.js";

export const getAll = async function(req, res) {
    console.log("------------controller------------");
    try{
        const producto= await scatalogo.getAll();
        console.log("... despues de scatalogo.getAll()");
        res.json(producto || []);    
    }
    catch(error){
        res.status(500).json({"error":"Error obteniendo registros"});
    };
};

export const getById = async function(req, res) {
    console.log("req.params.id: "+req.params.id);
    try{
        let producto= await scatalogo.getById(req.params.id);
        console.log("... despues de scatalogo.getById()");
        res.json(producto || {});
    }catch(error){
        res.status(500).json({"error":"Error obteniendo registros"});
    };
};

export const create = async function(req, res) {
    const objproducto=req.body;
    console.log(objproducto);
    console.log(req.user);

    try{
        let idproducto= await scatalogo.create(objproducto, req.user.id_persona);
        console.log("... despues de scatalogo.create()");
        res.json( {"idproducto":idproducto} );
    }catch(error){
        res.status(500).json({"error":"Error ingresando registros"});
    };
};

export const update = function(req, res) {
    console.log("------------controller------------");
    const objproducto=req.body;
    console.log(objproducto);
    scatalogo.update(req.params.id, objproducto)
    .then(numRegistros => {
        console.log("... despues de scatalogo.update()");
        res.json( {"numRegistros":numRegistros} );
    })
    .catch(err => {
        res.status(500).json({"error":"Error actualizando registros"});
    });
};

export const deletes = function(req, res) {
    scatalogo.deletes(req.params.id)
    .then(numRegistros => {
        console.log("... despues de scatalogo.deletes()");
        res.json( {"numRegistros":numRegistros} );
    })
    .catch(err => {
        res.status(500).json({"error":"Error eliminando registros"});
    });
};

export const upload = async function (req, res){

      console.log("--------controller----------");
      const objproducto=req.body;
      try {
        
        sfile.uploadproducto(req, res);
        console.log("response luego de upload");

      } catch (error) {
        res.status(500).json({"error":"Error actualizando registros"});
      };

};

export const download = async function(req, res) {
    console.log("------------controller------------");
    console.log("req.params.id: "+req.params.id);
    try{
        let rutaArchivo= await scatalogo.downloadArchivo(req.params.id);
        console.log("... despues de scatalogo.downloadArchivo()");
        if (fs.existsSync(rutaArchivo)) {
            // Configurar headers
            res.download(rutaArchivo, 'imagen.jpg', (err) => {
                if (err) {
                    console.error('Error al descargar:', err);
                    res.status(500).send({"error":'Error al descargar el archivo'});
                }
            });
        } else {
            res.status(404).send({"error":'Archivo no encontrado'});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({"error":"Error obteniendo registros"});
    };
};


