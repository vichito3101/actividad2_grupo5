import {Sequelize, DataTypes} from 'sequelize';
import orm from '../config/sequelize.js';
import {TipoDocumento} from './tipo.documento.model.js'

export const Persona = orm.define('persona', {
    id_persona:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 50],
        }
    },
    apellido:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 100],
        }
    },
    nro_documento:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 10],
        }
    },

    id_tipodocumento:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        },
        references:{
            model:TipoDocumento,
            key:'id_tipodocumento'
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [2, 100],
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 20]
        }
    },

    rol:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 20],
        }
    },
    
    fingreso:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },

},{
    freezeTableName: true,
    tableName: 'persona',
    timestamps: false,
});

TipoDocumento.hasMany(Persona, {foreignKey:'id_tipodocumento'});
Persona.belongsTo(TipoDocumento, {foreignKey:'id_tipodocumento'});


export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
}

//export const findAll = async function(){
  //  console.log("------------model------------");
    //const results= await Persona.findAll({include:TipoDocumento});
    //console.log(results);
    //return results.map(u=>u.toJSON());
//}



export const getAll = async function() {
    console.log("------------model------------");
    const results= await Persona.findAll({
       include:[TipoDocumento],
        where:{
            fingreso:true
        }
    });
    console.log(results);
    return results.map(u=>u.toJSON());
};

export const getById = async function(id_persona) {
    console.log("------------model------------");
    const results= await Persona.findAll({
        include:[TipoDocumento],
        where:{
            fingreso:true,
            id_persona:id_persona
        }
    });
    console.log(results);
    return results.map(u=>u.toJSON());
};

export const create = async function(obpersona) {
    try{
        const persona= await Persona.create({
            nombre:obpersona.nombre, 
            apellido:obpersona.apellido ,
            nro_documento:obpersona.nro_documento,  
            id_tipodocumento:obpersona.id_tipodocumento,
            email:obpersona.email,
            password:obpersona.password,
            rol:obpersona.rol
        });
        console.log(persona);
        return persona.toJSON().id_persona
    }catch(error){
        console.log("excepcion...");
        console.log(error);
        throw error;
    }
};

export const update = async function(id_persona, obpersona) {
    try{
        const [updatedRows]= await Persona.update({
            nombre:obpersona.nombre, 
            apellido:obpersona.apellido,
            nro_documento:obpersona.nro_documento, 
            id_tipodocumento:obpersona.id_tipodocumento,
            rol:obpersona.rol, 
        },{
            where:{
                id_persona:id_persona
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

export const deletes = async function(id_persona) {
    try{
        const [updatedRows]= await Persona.update({
            fingreso:false
        },{
            where:{
                id_persona:id_persona
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