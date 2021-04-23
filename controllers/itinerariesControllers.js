const Itinerary = require('../models/Itinerary');



const itinerariesControllers = {

    agregarItinerario: async (req,res)=>{
        try{
            const nuevoItinerario = new Itinerary(req.body)
            await nuevoItinerario.save()
            const todosItinerarios = await Itinerary.find();
            res.json({success:true,respuesta:todosItinerarios});
        }
        catch(error){
            res.json({success:false,respuesta:"error : " + error});
        }
    },
    obtenerTodosItinerarios: async(req,res) =>{
        try {
            const todosItinerarios = await Itinerary.find();
            res.json({success:true,respuesta:todosItinerarios});
        } catch (error) {
            res.json({success:false,respuesta:"error : " + error});
        }
    },
    obtenerItinerarioPorId: async(req,res) => {
        const id = req.params.id;
        try {
            const itinerario = await Itinerary.findById(id);
            res.json({success:true,respuesta:itinerario});
        } catch (error) {
            res.json({success:false,respuesta:"error : " + error});
        }
    },
    obtenerItinerarioPorCiudad : async(req,res) =>{
        const idCiudad = req.params.id;
        try {
            let itinerarios = await Itinerary.find({idCiudad}).populate('idCiudad')
            res.json({success:true,respuesta:itinerarios});
        } catch (error) {
            res.json({success:false,respuesta:"error : " + error});
        }
    },
    actualizarItinerario : async(req,res) => {
        const id = req.params.id;
        try {
            await Itinerary.findOneAndUpdate({_id : id},req.body,{new : true})
            const todosItinerarios = await Itinerary.find();
            res.json({success:true,respuesta:todosItinerarios});
        } catch (error) {
            res.json({success:false,respuesta:"error : " + error});
        }
    },
    borrarItinerario : async (req,res) => {
        const id = req.params.id;
        try {
            await Itinerary.findOneAndDelete({_id:id})
            const todosItinerarios = await Itinerary.find();
            res.json({success:true,respuesta:todosItinerarios});
        } catch (error) {
            res.json({success:false,respuesta:"error : " + error});
        }
    }
}


module.exports = itinerariesControllers;