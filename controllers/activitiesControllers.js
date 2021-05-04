const { populate } = require('../models/Activity');
const Activity = require('../models/Activity');

const errorBD = "an error occurred with the Database";
const errorActivityNotFound = "activity not found"

function responderFrontEnd(res,respuesta,error){
    res.json({
        success: !error ? true:false ,
        respuesta,
        error
    })
}

const activityControllers = {
    agregarActividad : async(req,res) => {
        let error, respuesta ;

        try {
            const actividadNueva = new Activity(req.body);
            if(actividadNueva){
                await actividadNueva.save();
                respuesta = await Activity.find();
            }else
                error = "error, a required field is missing";
        }catch(e){
            console.log(e);
            error = errorBD;
        }
        responderFrontEnd(res,respuesta,error);
       
    },
    obtenerActividades : async(req,res) =>{
        let error, respuesta ;
        try{
            respuesta = await Activity.find();
        }catch(e){
            console.log(e);
            error = errorBD
        }
        responderFrontEnd(res,respuesta,error);
    },
    obtenerActividadPorId : async (req,res) =>{
        const id = req.params.id;
        let error, respuesta;
        try{
             respuesta = await Activity.findById(id)
             if(!respuesta){
                 error = errorActivityNotFound;
             }
        }catch(e){
            console.log(e);
            error = errorBD
        }
        responderFrontEnd(res,respuesta,error);
    },

    obtenerActividadesPorItinerario : async(req,res)=>{
        const idItinerario = req.params.idItinerary;
        let error,respuesta;
        try{
            respuesta = await Activity.find({idItinerario}).populate('idItinerario')
            if(respuesta.length===0){
                error= "activities not found"
            }
        }catch(e){
            console.log(e);
            error = errorBD;
        }
        responderFrontEnd(res,respuesta,error);
    },

    actualizarActividad: async(req,res)=> {
        const id = req.params.id;
        let error,respuesta;

        try{
            let nuevaActividad = await Activity.findByIdAndUpdate(id,req.body,{new:true});
            nuevaActividad? respuesta =  await Activity.find(): error = errorActivityNotFound;
        }catch(e){
            console.log(e);
            error = errorBD;
        }
        responderFrontEnd(res,respuesta,error);
    },
    borrarActividad: async(req,res)=> {
        const id = req.params.id;
        let error,respuesta;
        try{
            const ciudadABorrar = await Activity.findByIdAndDelete(id)
            ciudadABorrar? respuesta = await Activity.find(): error= errorActivityNotFound;
        }catch(e){
            console.log(e);
            error = errorBD;
        }
        responderFrontEnd(res,respuesta,error)
    }
    
}

module.exports = activityControllers;

