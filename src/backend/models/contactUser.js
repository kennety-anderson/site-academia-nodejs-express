const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let contactSchema = new Schema({
    nome: String,
    email: {
        type: String,
        required: [true, 'E necessario um email.']
    }
});

module.exports = mongoose.model('Contato', contactSchema);