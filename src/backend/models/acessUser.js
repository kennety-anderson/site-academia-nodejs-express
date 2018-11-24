const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//modelo para validação da senha e usuario 
let userAcess = new Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Acess", userAcess);