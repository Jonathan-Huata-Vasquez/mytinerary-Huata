const mongoose = require('mongoose');
const Itinerary = require('../models/Itinerary');


const errorBD = "an error occurred with the Database";
const errorItineraryNotFound = "Itinerary not found"

function responderFrontEnd(res, respuesta, error) {
    res.json({
        success: !error ? true : false,
        respuesta,
        error
    })
}
function adaptarItinerariosUsuarioLogueado(itinerario,usuarioId = null){
    
    let estaLikeado = usuarioId ?  itinerario.usuariosLiked.some(unUsuarioId => {
        console.log(unUsuarioId , usuarioId)
        return unUsuarioId === usuarioId.toString()
    }) : false;
    let nuevosComentarios = itinerario.comentarios.map(unComentario => {
        let esModificable = usuarioId ? unComentario.usuarioId._id.toString() === usuarioId.toString() : false;
        return {
            ...unComentario.toObject(),
            usuarioId: {//le saco el id de los usuarios por seguridad
                ...unComentario.usuarioId.toObject(),
                _id:null
            },
            esModificable
        }
    })
    return {
        ...itinerario.toObject(),
        estaLikeado,
        comentarios: nuevosComentarios
    }

}

const itinerariesControllers = {

    agregarItinerario: async (req, res) => {
        try {
            const nuevoItinerario = new Itinerary(req.body)
            await nuevoItinerario.save()
            const todosItinerarios = await Itinerary.find();
            res.json({ success: true, respuesta: todosItinerarios });
        }
        catch (error) {
            res.json({ success: false, respuesta: "error : " + error });
        }
    },
    obtenerTodosItinerarios: async (req, res) => {
        try {
            const todosItinerarios = await Itinerary.find().populate({
                path: 'comentarios',
            });
            res.json({ success: true, respuesta: todosItinerarios });
        } catch (error) {
            res.json({ success: false, respuesta: "error : " + error });
        }
    },
    obtenerItinerarioPorId: async (req, res) => {
        const id = req.params.id;
        try {
            const itinerario = await Itinerary.findById(id);
            res.json({ success: true, respuesta: itinerario });
        } catch (error) {
            res.json({ success: false, respuesta: "error : " + error });
        }
    },
    obtenerItinerarioPorCiudad: async (req, res) => {
        const idCiudad = req.params.id;
        let error, respuesta;
        let usuarioId = req.user ? req.user._id : null;
        try {

            //popular : poblar, como tenemos una relacion de un itinerario con una ciudad,
            //hago que me traiga todos los datos del usuario
            let itinerarios = await Itinerary.find({ idCiudad }).populate({
                path:"comentarios.usuarioId",
                select:"nombre apellido usuarioAvatar "
            })

            respuesta = itinerarios.map(itinerario => adaptarItinerariosUsuarioLogueado(itinerario,usuarioId));
        } catch (e) {
            console.log(e)
            error = "error BD";
        }
        responderFrontEnd(res,respuesta,error)
    },


    actualizarItinerario: async (req, res) => {
        const id = req.params.id;
        try {
            await Itinerary.findOneAndUpdate({ _id: id }, req.body, { new: true })
            const todosItinerarios = await Itinerary.find();
            res.json({ success: true, respuesta: todosItinerarios });
        } catch (error) {
            res.json({ success: false, respuesta: "error : " + error });
        }
    },
    borrarItinerario: async (req, res) => {
        const id = req.params.id;
        try {
            await Itinerary.findOneAndDelete({ _id: id })
            const todosItinerarios = await Itinerary.find();
            res.json({ success: true, respuesta: todosItinerarios });
        } catch (error) {
            res.json({ success: false, respuesta: "error : " + error });
        }
    },

    //pre: el usuario existe en la BD y el itinerario tambien
    likearItinerario: async (req, res) => {
        let error, respuesta;
        const idItinerario = req.params.id;
        const idUsuario = req.user._id;
        try {
            //solo puede trae null si no existe el usuario en los likes del itinerario
            const usuarioLikeo = await Itinerary.findOne({
                _id: idItinerario,
                usuariosLiked: { $all: [idUsuario] } //le digo que encuentre al que tenga en usuariosLiked el usuario
                //$all es para que mi busque sin tener en cuenta el orden u otros elementos del array 
                //(sin el $all buscaria los que solo tengan un array solo con el elemento [idUsuario])
            });

            let updateOperator = usuarioLikeo
                ? { $pull: { usuariosLiked: idUsuario }, $inc: { likes: -1 } }
                : { $push: { usuariosLiked: idUsuario }, $inc: { likes: 1 } }


            let itinerario = await Itinerary.findByIdAndUpdate({ _id: idItinerario },updateOperator,{ new: true })
            .populate({
                path:"comentarios.usuarioId",
                select:"nombre apellido usuarioAvatar "
            });
            
            itinerario? respuesta = adaptarItinerariosUsuarioLogueado(itinerario) : error = errorItineraryNotFound;

        } catch (e) {
            console.log(e);
            error = "error DB";
        }

        responderFrontEnd(res,respuesta,error);
    },
    //idComentario para modificar o borrar
    //comentario para agregar o modificar
    
    modificarComentariosItinerario: async (req, res) => {
        let respuesta, error;
        try {
            const idItinerario = req.params.id;
            const usuarioId = req.user._id;
            const {idComentario,comentario,accion} = req.body ;
            let querySelector ;
            let updateOperator ;
            switch(accion){
                case "agregar":
                    querySelector = {_id : idItinerario };
                    updateOperator = { $push:{ comentarios:{ usuarioId,comentario } } };
                    break;
                case "editar": //comentarios: { $elemMatch:  { $eq :{_id: idComentario}} } 
                    querySelector = { _id : idItinerario ,"comentarios._id":idComentario  } ;//$eq compara si son lo mismo
                    updateOperator = {$set : {"comentarios.$.comentario": comentario }};
                    break;
                case "borrar" : 

                    querySelector = { _id: idItinerario };
                    updateOperator = {$pull : {comentarios:{_id : idComentario}}}
                    break;
                default:
                    error = "unknown action on modificarComentario : " + accion;
                    responderFrontEnd(res,respuesta,error);
            }
            let itinerarioModificado = await Itinerary.findOneAndUpdate(querySelector, updateOperator,{ new: true })
            .populate({
                path:"comentarios.usuarioId",
                select:"nombre apellido usuarioAvatar "
            })

            itinerarioModificado
            ? respuesta = adaptarItinerariosUsuarioLogueado(itinerarioModificado,usuarioId)
            : error = errorItineraryNotFound;
            
        } catch (e) {
            console.log(e)
            error = errorBD;
        }
        //console.log(respuesta)
        responderFrontEnd(res, respuesta, error)
    },
    
    /*borrarComentario: async (req,res) => {
        const {idComentario} = req.body ;
        const idItinerario = req.params.id;
        
        let respuesta,error;
        try{
            respuesta = await Itinerary.findByIdAndUpdate(idItinerario,{
                $pull:{comentarios:{_id:idComentario}}
            },{new:true}).populate({
                path:"comentarios.usuarioId",
                select:"nombre apellido usuarioAvatar "
            })
            console.log(respuesta)
            error = !respuesta && errorItineraryNotFound
        }
        catch(e){
            console.log(e)
            error = errorBD;
        }
        responderFrontEnd(res,respuesta,error);
    },*/
}


module.exports = itinerariesControllers;