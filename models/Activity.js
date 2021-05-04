const mongoose = require('mongoose');
const activityEsquema = new mongoose.Schema({
    titulo: {type:String,required:true},
    imagen: {type:String,required:true},
    idItinerario:{type: mongoose.Types.ObjectId, ref:"itinerary",required:true}
})
const Activity = mongoose.model("activity",activityEsquema)


module.exports = Activity;