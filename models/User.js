const mongoose = require('mongoose');
const userEsquema = new mongoose.Schema({
    nombre: {type: String, required:true},
    apellido:{type: String, required:true},
    email:{type: String, required:true},
    contrasena:{type: String, required:true},
    usuarioAvatar:{type: String, required:true},
    pais:{type: String,},
});

const User = mongoose.model('user',userEsquema);

module.exports = User;

