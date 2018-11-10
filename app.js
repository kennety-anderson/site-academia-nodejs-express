//requerimento dos pacotes que iremos usar e chamada do express
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const colors = require('colors');
const path = require('path');
const port = require('./src/backend/config/config');
const app = express();


//midlewares para entregarem arquivos estaticos
app.use(express.static(__dirname + '/src/frontend'))
app.use(express.static(__dirname + '/content'));
app.use(express.static(__dirname + '/src'));

//setando qual vai ser nosso motor de views
app.set('view engine', 'hbs');

//midlewares para parcionar o corpo e para gravar no BD em formato json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//midlewares das rotas dos arquivos hbs
app.use(require('./src/backend/routes/routeRaiz'));
app.use(require('./src/backend/routes/routeHome'));
app.use(require('./src/backend/routes/routeContact'));


//conexão com o banco de dados
mongoose.connect('mongodb://localhost:27017/projectVenda', {
    useCreateIndex: true,
    useNewUrlParser: true
}, (err, res) => {
    if (err) {
        return console.log(err);
    }
    console.log('Base de dados online.'.cyan);
});


//criação do nosso servidor http via express
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}.`.cyan);
    console.log('===================================');
});