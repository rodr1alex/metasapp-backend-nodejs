const db = require('./configuracion');


//------------------ tabla: metas ---------------------------

function crearMeta(item, callback){
    const nombre_tabla = 'metas';
    const keys = Object.keys(item);
    let propiedades = keys.join(', ');
    let valores = keys.map(clave => `'${item[clave]}'`).join(', ');
    
    db.any(`INSERT INTO ${nombre_tabla} (${propiedades}) VALUES(${valores}) returning * `)
    .then(([resultado]) =>{
        resultado.plazo = resultado.plazo.toISOString().split('T')[0];
        callback(null, resultado);
    })
    .catch(error =>{
        callback(error);
    });
}

function pedirMetas(cuenta_id, callback){
    const tabla = 'metas';
    db.any(`SELECT * FROM ${tabla} WHERE cuenta_id=${cuenta_id}`)
    .then(resultado =>{
        resultado.map(meta => {
            meta.plazo = meta.plazo.toISOString().split('T')[0]
        })
        callback(null, resultado);
    })
    .catch(error =>{
        callback(error);
    });
}

function pedirMeta(meta_id, cuenta_id,callback){
    const tabla = 'metas'
    db.any(`SELECT * FROM ${tabla} WHERE meta_id=${meta_id} AND cuenta_id=${cuenta_id}`)
    .then(resultado =>{
        resultado[0].plazo = resultado[0].plazo.toISOString().split('T')[0];
        callback(null, resultado);
    })
    .catch(error =>{
        callback(error);
    });
}

function actualizarMeta(meta_id, cuenta_id, metaActualizada, callback){
    const tabla = 'metas'
    const keys = Object.keys(metaActualizada);
    const actualizaciones = keys.map(key => `${key} = '${metaActualizada[key]}'`).join(', ');

    db.any(`UPDATE ${tabla} SET ${actualizaciones} WHERE meta_id = ${meta_id} AND cuenta_id=${cuenta_id} returning *`)
    .then(([resultado]) =>{
        resultado.plazo = resultado.plazo.toISOString().split('T')[0];
        callback(null, resultado);
    })
    .catch(error =>{
        callback(error);
    });
}

function borrarMeta(meta_id, cuenta_id, callback){
    const tabla = 'metas';
    db.any(`DELETE FROM ${tabla} WHERE meta_id = ${meta_id} AND cuenta_id=${cuenta_id}`)
    .then(() =>{
        callback(null);
    })
    .catch(error =>{
        callback(error);
    });
}


//------------------ tabla: cuentas ---------------------------

function crearCuenta(item, callback){
    const nombre_tabla = 'cuentas';
    const keys = Object.keys(item);
    let propiedades = keys.join(', ');
    let valores = keys.map(clave => `'${item[clave]}'`).join(', ');
    
    db.any(`INSERT INTO ${nombre_tabla} (${propiedades}) VALUES(${valores}) returning * `)
    .then(([resultado]) =>{
        callback(null, resultado);
    })
    .catch(error =>{
        callback(error);
    });
}

function pedirCuenta(usuario,callback){
    db.any(`SELECT * FROM cuentas WHERE usuario = '${usuario}'`)
    .then(resultado =>{
        callback(null, resultado);
    })
    .catch(error =>{
        callback(error);
    });
}



module.exports = {pedirMetas, pedirMeta, crearMeta, crearCuenta, actualizarMeta, borrarMeta, pedirCuenta};