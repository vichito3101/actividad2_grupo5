import {Sequelize, DataTypes} from 'sequelize';
import orm from '../config/sequelize.js';

export const Categoria = orm.define('categoria', {
    id_categoria:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    }
},{
    tableName: 'categoria',
    timestamps: false,
});

export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
};

