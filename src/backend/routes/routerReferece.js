const express = require('express');

const app = express();

//referencia para todas as rotas
app.use(require('./routeHome'));
app.use(require('./routeContact'));
app.use(require('./routeLogin'));

module.exports = app;