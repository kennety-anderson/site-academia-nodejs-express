//requerimento dos pacotes que iremos usar e chamada do express
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const colors = require('colors');
const path = require('path');
const port = require('./src/backend/config/config');
const app = express();

//setando qual vai ser nosso motor de views
app.set('view engine', 'hbs');

//midlewares para entregarem arquivos estaticos
app.use(express.static(__dirname + '/src/frontend'))
app.use(express.static(__dirname + '/content'));
app.use(express.static(__dirname + '/src'));


//midlewares para parcionar o corpo e para gravar no BD em formato json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//midlewares das rotas dos arquivos hbs
app.use(require('./src/backend/routes/routerReferece'));


//conexão com o banco de dados
mongoose.connect('mongodb://localhost:27017/projectVenda', {
    useCreateIndex: true,
    useNewUrlParser: true
}, (err, res) => {
    if (err) {
        return console.log(`${err}`.red);
    }
    console.log('Base de dados online.'.cyan);
});

//criação do servidor http
const server = http.createServer(app);

//inicialização do servidor http
server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}.`.cyan);
    console.log('===================================');
});
