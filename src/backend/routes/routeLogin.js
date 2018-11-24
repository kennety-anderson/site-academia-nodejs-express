//requirementos das bibliotecas e modulos internos necessarios
const express = require('express');
const colors = require('colors');
const path = require('path');
const bcrypt = require('bcrypt');
const Contato = require('../models/contactUser');
const Acess = require('../models/acessUser');

const app = express();

//criação da senha e usuario
let acesso = new Acess({
    user: "kennety",
    password: bcrypt.hashSync("123456", 10)
});

//teste para verificar se a existe para evitar duplicidade
if (acesso.hasOwnProperty('password') != "") {

    acesso.save((err, acessoDB) => {
        if (err) {
            console.log(`${err}`.red);
        } else {
            console.log('User and password ok.');
        }
    });
}

//metodo GET da pagina de login
app.get('/admin', (req, res) => {
    res.render(path.join(__dirname, '../../frontend/views/login'), {
        status: 'Digite seu usuario e senha'
    });
});

//metodo POST para validação da senha e resolução da view de contatos
app.post('/admin', (req, res) => {

    let body = req.body;

    Acess.findOne({ user: body.user }, (err, acessoDB) => {

        //teste para anelise de erro de servidor 
        if (err) {
            return res.status(500).json({
                ok: false,
                err: 'erro no server'
            });
        }

        //teste para verificar se o usuario é verdadeiro
        if (!acessoDB) {
            return res.render(path.join(__dirname, '../../frontend/views/login.hbs'), {
                status: 'Usuario ou senha incorretos'
            });
        }

        //teste para verificar se a senha é verdadeira 
        if (!bcrypt.compareSync(body.password, acessoDB.password)) {
            return res.status(500).json({
                ok: false,
                err: 'senha errada'
            });
        }

        //listagem dos contatos realizados apos validação
        Contato.find({})
            .exec((err, contatosDB) => {
                if (err) {
                    return res.status(404)
                        .send('<h1>Page not found 404</h1>');
                }


                let list = contatosDB.map((item, index) => {
                    return `<li>${index}: ${item}`;
                });

                res.send(`<h1 style="text-align: center">Lista de contatos realizados</h1>
                    <ul>${list}</ul>`);
            });
    });
});


module.exports = app;