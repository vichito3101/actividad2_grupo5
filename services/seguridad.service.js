import pool from "../config/db.js"

/*export const login = function(objUsuario) {
    console.log("------------service------------");
    return new Promise( (resolve, reject) => {
        pool.query(
            'select u.id_persona, u.email, u.password, u.rol from bdprueba.persona u '+
            'where u.email=? and u.fingreso=true', [objUsuario.email], (err, results, fields) =>{
                console.log(results);
                if (err) reject(err);
                else resolve(results);
            });
    });
};*/
export const login = async function(objUsuario) {
    console.log("------------service------------");
    const [results, fields]= await pool.query(
            'select u.id_persona, u.email, u.password, u.rol from actividad2.persona u '+
            'where u.email=? and u.fingreso=true', [objUsuario.email]
        );
    console.log(results);
    return results;
};

export const findById = async function(id_persona) {
    console.log("------------service------------");
    const [results, fields]= await pool.query(
            'select u.id_persona, u.email, u.password, u.rol from actividad2.persona u '+
            'where u.id_persona=? and u.fingreso=true', [id_persona]
        );
    return results;
};
