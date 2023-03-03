const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');


require('./db.js');

const server = express();

// Aca vienen los middlewares
/* 
Lo que hacen los middlewares es tomar las request, hacerles "algo" y dejarlas pasar
server.use(express.json()); transforma lo que llega al server en json en un objeto que entienda js
server.use(morgan("dev")); nos va a mostrar un poco mas de informacion de cada request 

*/

// MIDDLEWARES
server.name = 'API';
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// ROUTES UTILIZO EL INDEX.JS
server.use("/", routes)

// CAPTURAR ERRORES FINALES.. ENDWARE
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
