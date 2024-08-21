var express = require('express');
var router = express.Router();
const  {pedirMetas, pedirMeta, crearMeta, actualizarMeta, borrarMeta} = require('../db/pedidos');
const {body, validationResult} = require('express-validator');

router.get('/', function(req, res, next) {
  pedirMetas(req.auth.cuenta_id, (err, metas) =>{
    if(err) return next(err);
    res.send(metas);
  })
});

router.get('/:id', function(req, res, next) {
  pedirMeta(req.params.id, req.auth.cuenta_id, (err, meta) =>{
    if(err) return next(err);
    if(!meta.length) return res.sendStatus(404);
    res.send(meta[0]);
  })
});

router.post('/',
  body('detalles').isLength({min:3}),
  body('periodo').not().isEmpty(),
  function(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    const metaNueva = req.body;
    crearMeta(metaNueva, (err, meta) =>{
      if(err) return next(err);
      res.send(meta);
    })
});

router.put('/:id',
  body('detalles').isLength({min:5}),
  body('periodo').not().isEmpty(),
  function(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const metaActualizada = req.body;
    const meta_id_url = req.params.id;

    //Valida que id enviada en body y id por url sean iguales
    if(metaActualizada.meta_id != meta_id_url) return res.sendStatus(409);

    //Verifica que la meta exista en DB
    pedirMeta(meta_id_url, req.auth.cuenta_id,(err, meta) =>{
      if(err) return next(err);
      if(!meta.length) return res.sendStatus(404);
      //Si los id de url y enviado por body coinciden, y la meta existe en DB, se puede actualizar
      actualizarMeta(meta_id_url, req.auth.cuenta_id,metaActualizada,(err, actualizada) =>{
        if(err) return next(err);
        res.send(actualizada);
      })
    })
  });

router.delete('/:id', function(req, res, next) {

  //Verifica que la meta exista en DB 
  pedirMeta(req.params.id, req.auth.cuenta_id, (err, meta) =>{
    if(err) return next(err);
    if(!meta.length) return res.sendStatus(404);

    //Si existe, procede a borrar la meta
    borrarMeta(req.params.id, req.auth.cuenta_id, (err) =>{
      if(err) return next(err);
      res.send('Meta borrada con exito!');
    })
  })
});

module.exports = router;




/*let metas = [
  {
    "id": "1",
    "detalles": "Correr por 30 minutos",
    "plazo": "día",
    "frecuencia": 1,
    "icono": "🏃‍♂️",
    "meta": 365,
    "fecha_límite": "2030-01-01",
    "completado": 5
  },
  {
    "id": "2",
    "detalles": "Leer libros",
    "plazo": "año",
    "frecuencia": 6,
    "icono": "📚",
    "meta": 12,
    "fecha_límite": "2030-01-01",
    "completado": 0
  },
  {
    "id": "3",
    "detalles": "Viajar a nuevos lugares",
    "plazo": "mes",
    "frecuencia": 1,
    "icono": "✈️",
    "meta": 60,
    "fecha_límite": "2030-01-01",
    "completado": 40
  }
];*/