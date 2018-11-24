const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//modelo para realização de contatos
let contactSchema = new Schema({
    nome: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'E necessario um email.']
    },
    mensagem: {
        type: String
    }
});

module.exports = mongoose.model('Contato', contactSchema);