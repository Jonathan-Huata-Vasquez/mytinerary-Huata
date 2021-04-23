const mongoose = require('mongoose');
const itineraryEsquema = new mongoose.Schema({
    titulo: {type: String, required:true},
    autorNombre:{type: String, required:true},
    autorFoto:{type: String, required:true},
    precio:{type: Number, required:true, min :1 , max: 5 },
    duracion:{type: Number, required:true , min: 1},
    likes:{type: Number, default: 0},
    comentarios :[{usuarioId:{type: mongoose.Types.ObjectId, ref: 'user'},comentario:{type:String} }],
    usuariosLiked: [{type:String}],
    idCiudad: {type: mongoose.Types.ObjectId, ref: 'city',required :true},
    hashTags: [{type: String}]
});

const Itinerary = mongoose.model('itinerary',itineraryEsquema);
module.exports = Itinerary;