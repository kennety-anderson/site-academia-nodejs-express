const express = require('express');
const path = require('path');
const Contato = require('../models/contactUser');
const colors = require('colors');
const app = express();


app.get('/contato', (req, res) => {
    res.render(path.join(__dirname, '../../frontend/views/contato.hbs'));
});


app.post('/contato', (req, res) => {

    let contato = new Contato({
        nome: req.body.nome,
        email: req.body.email
    });


    contato.save((err, contatoDB) => {

        console.log('===================================');

        if (err) {
            return console.log(`${err}`.red);
        }
        res.render(path.join(__dirname, '../../frontend/views/contato.hbs'), {
            message: 'Mensagem enviada com sucesso!'
        });
        console.log(`Gravado com sucesso no banco de dodos: ${contatoDB}`.green);
    });
});

module.exports = app;