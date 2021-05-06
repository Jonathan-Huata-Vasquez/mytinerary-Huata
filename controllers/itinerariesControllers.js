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
        try {
            //popular : poblar, como tenemos una relacion de un itinerario con una ciudad,
            //hago que me traiga todos los datos del usuario

            let itinerarios = await Itinerary.find({ idCiudad }).populate('idCiudad').populate({
                path:"comentarios.usuarioId",
                select:"nombre apellido usuarioAvatar -_id"
            }
                )
            let nuevosItineraios = itinerarios.map(itinerario => {
                return {
                    ...itinerario.toObject(),
                    estaLikeado: itinerario.usuariosLiked.some(idUser => {
                        //si existe  prop user del req , continua ,
                        return req.user?._id == idUser;
                    })
                }
            });
            respuesta = nuevosItineraios;
        } catch (e) {
            console.log(e)
            error = "error BD";
        }
        res.json({
            success: !error ? true : false,
            respuesta,
            error
        });

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
            const existeUsuario = await Itinerary.findOne({
                _id: idItinerario,
                usuariosLiked: { $all: [idUsuario] } //le digo que encuentre al que tenga en usuariosLiked el usuario
                //$all es para que mi busque sin tener en cuenta el orden u otros elementos del array 
                //(sin el $all buscaria los que solo tengan un array solo con el elemento [idUsuario])
            });

            let modificaciones = existeUsuario
                ? { $pull: { usuariosLiked: idUsuario }, $inc: { likes: -1 } }
                : { $push: { usuariosLiked: idUsuario }, $inc: { likes: 1 } }


            respuesta = await Itinerary.findByIdAndUpdate(
                { _id: idItinerario },
                modificaciones,
                { new: true }
            );

        } catch (e) {
            console.log(e);
            error = "error DB"
        }

        //mejorar codigo
        res.json({
            success: !error ? true : false,
            respuesta,
            error
        })
    },


    agregarNuevoComentario: async (req, res) => {
        const idItinerario = req.params.id;
        const usuarioId = req.user._id;
        const {comentario} = req.body
        let respuesta, error;
        
        try {
            let itinerarioModificado = await Itinerary.findByIdAndUpdate({ _id: idItinerario }, {
                $push: {
                    comentarios: { usuarioId, comentario }
                }
            },
            { new: true })

            itinerarioModificado ? respuesta = itinerarioModificado : error = errorItineraryNotFound;

        } catch (e) {
            console.log(e)
            error = errorBD;
        }
        responderFrontEnd(res, respuesta, error)
    }
}


module.exports = itinerariesControllers;