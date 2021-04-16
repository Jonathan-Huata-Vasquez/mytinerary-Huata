
const validador = (req,res,next)=>{
    const {nombreCiudad} = req.body;
    
    if(!nombreCiudad ||nombreCiudad === "") {
        return res.json({success : false,error : "no se puede mandar el nombre de la ciudad en blanco"})    
    }
    next();//si no pongo esto , el controlador , que esta como 2do parametro de route.verboHTML() , no se va a ejecutar
    //pasa al siguiente controlador
}

module.exports = validador;