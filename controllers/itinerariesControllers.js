const mongoose = require('mongoose');
const Itinerary = require('../models/Itinerary');


const errorBD = "an error occurred with the Database";
const errorItineraryNotFound = "Itinerary not found"

function responderFrontEnd(res, respuesta, error) {
    res.json({
        success: !error ? true : false,
        respuesta,
        error
    });
}
function adaptarItinerariosUsuarioLogueado(itinerario,usuarioId = null){
    
    let estaLikeado = usuarioId ?  itinerario.usuariosLiked.some(unUsuarioId => {
        return unUsuarioId === usuarioId.toString();
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
        let respuesta,error;
        try {
            const nuevoItinerario = new Itinerary(req.body);
            await nuevoItinerario.save();
            respuesta = await Itinerary.find();
        }
        catch (err) {
            console.log(err)
            error = errorBD;
        }
        responderFrontEnd(res,respuesta,error)
    },
    obtenerTodosItinerarios: async (req, res) => {
        let respuesta,error;
        try {
            respuesta = await Itinerary.find().populate({
                path: 'comentarios',
            });
            
        } catch (error) {
            error = errorBD;
        }
        responderFrontEnd(res,respuesta,error)
    },
    obtenerItinerarioPorId: async (req, res) => {
        let respuesta, error;
        try {
            const id = req.params.id;
            respuesta = await Itinerary.findById(id);
            respuesta || (error = errorItineraryNotFound);
        } catch (error) {
            error = errorBD
        }
        responderFrontEnd(res,respuesta,error);
    },
    obtenerItinerarioPorCiudad: async (req, res) => {
        const idCiudad = req.params.id;
        let usuarioId = req.user ? req.user._id : null;
        let error, respuesta;

        try {
            
            //popular : poblar, como tenemos una relacion de un itinerario con una ciudad,
            //hago que me traiga todos los datos del usuario diciendole la ruta y solo las cosas que quiero que me popule
            let itinerarios = await Itinerary.find({ idCiudad }).populate({
                path:"comentarios.usuarioId",
                select:"nombre apellido usuarioAvatar " //me trae el _id 
            })
            itinerarios || responderFrontEnd(res,respuesta,errorItineraryNotFound)
            respuesta = itinerarios.map(itinerario => adaptarItinerariosUsuarioLogueado(itinerario,usuarioId));
        } catch (e) {
            console.log(e)
            error = errorBD;
        }
        responderFrontEnd(res,respuesta,error)
    },


    actualizarItinerario: async (req, res) => {
        const id = req.params.id;
        let respuesta,error ;
        try {
            let nuevoItinerario = await Itinerary.findOneAndUpdate({ _id: id }, req.body, { new: true });
            nuevoItinerario || responderFrontEnd(res,respuesta,"no se pudo actualizar el itinerario")
            respuesta = await Itinerary.find();
        } catch (error) {
            error = errorBD;
        }
        responderFrontEnd(res,respuesta,error)
    },
    borrarItinerario: async (req, res) => {
        const id = req.params.id;
        let respuesta, error;
        try {
            let itinerarioBorrado = await Itinerary.findOneAndDelete({ _id: id });
            itinerarioBorrado || responderFrontEnd(res,respuesta,errorItineraryNotFound);
            respuesta = await Itinerary.find();
            
        } catch (err) {
            console.log(err)
            error = errorBD;
        }
        responderFrontEnd(res,respuesta,error);
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
                //$all es para que me busque sin tener en cuenta el orden u otros elementos del array 
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

            itinerario? respuesta = adaptarItinerariosUsuarioLogueado(itinerario,idUsuario) : error = errorItineraryNotFound;

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
                    //$push : {laUbicacionDeñArray: elementoAAagrear}
                    updateOperator = { $push:{ comentarios:{ usuarioId,comentario } } };
                    break;
                case "editar": 
                    querySelector = { _id : idItinerario ,"comentarios._id":idComentario  } ; //para usar el $set es necesario especificar el campo donde esta el array en la query
                    //$ se queda con el primer elemeno que coincide con la query , el campo en el que esta el array en el que buscaremos el elemento debe estar especificado en la query
                    //con el $ especifico que propiedad de los comentarios modificar, si saca $ escribira un nuevo campo
                    
                    updateOperator = {$set : {"comentarios.$.comentario": comentario }}; 
                    break;
                case "borrar" : 
                    querySelector = { _id: idItinerario };
                    updateOperator = {$pull : {comentarios:{_id : idComentario}}}; //$pull : camino donde se encuentra el array : {condicion para el borrar elementos}
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
}


module.exports = itinerariesControllers;