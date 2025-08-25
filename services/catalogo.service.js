import * as modelproducto from "../models/producto.model.js";
import * as archivos from "../utils/archivos.js";

export const getAll = async function() {
    console.log("------------service------------");
    const results= await modelproducto.getAll();
    return results;
};

export const getById = async function(idproducto) {
    console.log("------------service------------");
    const results= await modelproducto.getById(idproducto);
    console.log("luego del modelAutomovil");
    return results;
};

export const create = async function(obproducto, id_persona) {
    const idproducto= await modelproducto.create(obproducto, id_persona); 
    return idproducto;
};

export const update = async function(id_producto, objproducto) {
    const results= await modelproducto.update(id_producto, objproducto);
    return results;
};

export const deletes = async function(id_producto) {
    const results= await modelproducto.deletes(id_producto);
    return results;
};

export const updateArchivo = async function(id_producto, filename) {
    const results= await modelproducto.updateArchivo(id_producto, filename);
    return results;
};

export const downloadArchivo = async function(id_producto) {
    console.log("------------service------------");
    const results= await modelproducto.getById(id_producto);
    console.log("luego del modelproducto: "+results[0].archivo);
    return archivos.getArchivo(results[0].archivo);
};
