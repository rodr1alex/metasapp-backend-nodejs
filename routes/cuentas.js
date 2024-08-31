var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const  {pedirCuenta, crearCuenta} = require('../db/pedidos');
const {body, validationResult} = require('express-validator');



router.post(
  /*ruta(endpoint)*/'/signup',
  /*validaciones*/body('usuario').isEmail(),
  /*validaciones*/body('clave').isLength({min:5}),
  function(req, res, next) {

    //resultados de la validacion:
    const errors = validationResult(req);
    info(errors,'errors');     //info

    //si existen errores, envia info a usuario:
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    //Obtener credenciales desde el pedido
    const nuevaCuenta = req.body;         
    info(nuevaCuenta,'nuevaCuenta');  //info

    //Uso del metodo bcrypt.hash(clave, complejidad, callback) genera hash asociado a la cuenta
    bcrypt.hash(nuevaCuenta.clave, 12,function(err,hash){
        if(err) return console.error(err);

        //Se registra nuevo usuario con: {usuario, hash, nick}
        crearCuenta({usuario:nuevaCuenta.usuario, hash, nick:nuevaCuenta.nick},(err, cuenta) =>{
            if(err) return next(err);

            //Se crea token usando metodo jwt.sign     
            let ficha = jwt.sign({
              exp: Math.floor(Date.now()/1000) + 3000,
              cuenta_id: cuenta.cuenta_id,
              nick: cuenta.nick
            },'secreto');

            //Se enviar respuesta {token, cuenta_id}
            res.send({token: ficha, cuenta_id:cuenta.cuenta_id, nick: cuenta.nick});
          })
    })    
});

router.post('/login',
  body('usuario').isEmail(),
  body('clave').isLength({min:5}),
  function(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errores: errors.array()});
    const login = req.body;

    //Se busca la cuenta en DB
    pedirCuenta(login.usuario, (err, [cuenta]) =>{
        if(err) return next(err);
        if(!cuenta) return res.sendStatus(404);

        //metodo bcrypt.compare(clave, hash, callback) compara clave y hash
        bcrypt.compare(login.clave, cuenta.hash, function(err, result){
            //tipo de 'result': boolean
            if(err) return next(err);
            if(!result) return res.sendStatus(401);
            let ficha = jwt.sign({
                exp: Math.floor(Date.now()/1000) + 300,
                cuenta_id: cuenta.cuenta_id,
                nick: cuenta.nick
            },'secreto');
            res.send({token: ficha, cuenta_id:cuenta.cuenta_id, nick: cuenta.nick});
        });
      })
});

//funcion auxiliar, no tiene nada que ver con la app principal
function info(variable, nombre_variable){  
  console.log(`Contenido de ${nombre_variable}: `, variable);
  console.log(`Tipo de variable de ${nombre_variable}: `, typeof(variable));
}

module.exports = router;
