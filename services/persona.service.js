import * as modelusuario from "../models/persona.model.js";

export const getAll = async function() {
    console.log("------------service------------");
    const results= await modelusuario.getAll();
    return results;
};

export const getById = async function(id_persona) {
    console.log("------------service------------");
    const results= await modelusuario.getById(id_persona);
    console.log("luego del modelAutomovil");
    return results;
};

export const create = async function(obpjpersona) {
    const idpersona= await modelusuario.create(obpjpersona); 
    return idpersona;
};

export const update = async function(id_persona, objpersona) {
    const results= await modelusuario.update(id_persona, objpersona);
    return results;
};

export const deletes = async function(id_persona) {
    const results= await modelusuario.deletes(id_persona);
    return results;
};