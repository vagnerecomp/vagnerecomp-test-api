const mongoose = require("mongoose");
const Burger = mongoose.model('Burger', {
    nome: String,
    carne: String,
    pao: String,
    status: String,
    opcionais: []
});

module.exports = Burger;