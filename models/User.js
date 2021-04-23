const mongoose = require('mongoose');
const userEsquema = new mongoose.Schema({
    nombre: {type: String, required:true},
    apellido:{type: String, required:true},
    email:{type: String, required:true},
    contrasenia:{type: String, required:true},
    usuarioAvatar:{type: String, required:true},
    pais:{type: String, required:true},
});

const User = mongoose.model('user',userEsquema);

module.exports = User;

