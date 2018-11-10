const express = require('express');
const path = require('path');
const app = express();

// app.get('/home', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../frontend/views/index.html'));
// })

app.get('/home', (req, res) => {
    res.render(path.join(__dirname, '../../frontend/views/home.hbs'));
    console.log('carregado o view hbs');
});

module.exports = app;