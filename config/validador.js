
const validador = {
    validadorCampoVacio : (req,res,next)=>{
        const {nombreCiudad} = req.body;
        if(!nombreCiudad || nombreCiudad === "") {
            return res.json({success : false,error : "you can not send the name of the city empty"})    
        }
        next();//si no pongo esto , el controlador , que esta como 2do parametro de route.verboHTML() , no se va a ejecutar
        //pasa al siguiente controlador
    },
    
}

    

module.exports = validador;