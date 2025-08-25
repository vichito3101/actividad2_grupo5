import {Sequelize, DataTypes} from 'sequelize';
import orm from '../config/sequelize.js';
import {Categoria} from './categoria.model.js';
import {Persona} from './persona.model.js';

export const Producto = orm.define('producto', {
    id_producto:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30],
        }
    },
        unidad_medida:{
          type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 10],
        }
    },
    precio:{
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },

    stock:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    activo:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    fecharegistro:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
            isDate: true
        }
    },
    id_categoria:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        },
        references:{
            model:Categoria,
            key:'id_categoria'
        }
    },
    id_persona:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isInt: true
        },
        references:{
            model:Persona,
            key:'id_persona'
        }
    },
},{
    freezeTableName: true,
    tableName: 'producto',
    timestamps: false,
});

Categoria.hasMany(Producto, {foreignKey:'id_categoria'});
Producto.belongsTo(Categoria, {foreignKey:'id_categoria'});

export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
}

export const getAll = async function() {
    console.log("------------model------------");
    const results= await Producto.findAll({
       include:[Categoria],
        where:{
            activo:true
        }
    });
    console.log(results);
    return results.map(u=>u.toJSON());
};

export const getById = async function(idproducto) {
    console.log("------------model------------");
    const results= await Producto.findAll({
        include:[Categoria],
        where:{
            activo:true,
            id_producto:idproducto
        }
    });
    console.log(results);
    return results.map(u=>u.toJSON());
};

export const create = async function(obproducto, id_persona) {
    try{
        const producto= await Producto.create({
            nombre:obproducto.nombre, 
            unidad_medida:obproducto.unidad_medida,
            precio:obproducto.precio, 
            stock:obproducto.stock,
            id_categoria:obproducto.id_categoria, 
            id_persona:id_persona
        });
        console.log(producto);
        return producto.toJSON().id_producto;
    }catch(error){
        console.log("excepcion...");
        console.log(error);
        throw error;
    }
};

export const update = async function(id_producto, obproducto) {
    try{
        const [updatedRows]= await Producto.update({
            nombre:obproducto.nombre, 
            unidad_medida:obproducto.unidad_medida,
            precio:obproducto.precio, 
            stock:obproducto.stock,
            id_categoria:obproducto.id_categoria, 
        },{
            where:{
                id_producto:id_producto
            }
        });
        console.log(updatedRows);
        return updatedRows;
    }catch(error){
        console.log("excepcion...");
        console.log(error);
        throw error;
    }
};

export const deletes = async function(id_producto) {
    try{
        const [updatedRows]= await Producto.update({
            activo:false
        },{
            where:{
                id_producto:id_producto
            }
        });
        console.log(updatedRows);
        return updatedRows;
    }catch(error){
        console.log("excepcion...");
        console.log(error);
        throw error;
    }
};

export const updateArchivo = async function(id_producto, filename) {
    try{
        const [updatedRows]= await Producto.update({
            archivo:filename
        },{
            where:{
                id_producto:id_producto
            }
        });
        console.log(updatedRows);
        return updatedRows;
    }catch(error){
        console.log("excepcion...");
        console.log(error);
        throw error;
    }
};

