var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var { expressjwt: jwt } = require("express-jwt");
var indexRouter = require('./routes/index');
var metasRouter = require('./routes/metas');
var cuentasRouter = require('./routes/cuentas');

var app = express();

app.use(cors());                                          //evita bloqueo de CORS
app.use(logger('dev'));
app.use(express.json());                                  //hacer que entienda json
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  //Hacer un direcctorio publico

//Verifica que token sea el correcto 
//ademas las rutas: { path: ["/api/signup","/api/login"] } no estan afectadas a verificacion
app.use(
  jwt({
    secret: "secreto",
    algorithms: ["HS256"],
  }).unless({ path: ["/api/signup","/api/login"] })
);  

//Sistema de ruteos
app.use('/', indexRouter);                                
app.use('/api/metas', metasRouter);
app.use('/api', cuentasRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error(err)
  res.send('error');
});

module.exports = app;
