const express = require("express");

const app = express();
const { API_VERSION } = require('./config');

//Cargar el enrutamiento del server
const useRoutes = require("./routers/user");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Configuracion del Header HTTP
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE, PATCH, OPTIONS");
  next();
});

//Rutas basicas
app.use(`/api/${API_VERSION}`, useRoutes);
module.exports = app

