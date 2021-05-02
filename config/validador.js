const Joi = require('joi')


const validador = (req,res,next) => {
    //Esquema
    const esquema = Joi.object({
        nombre: Joi.string().trim().min(2).max(20).required().pattern(new RegExp('[a-zA-Z]$'))
        .messages({"string.base": "Your first name should by a text type"}),
        apellido: Joi.ref('nombre'),
        email: Joi.string().trim().required().email(),
        contrasena: Joi.string().trim().required().pattern(new RegExp('[a-zA-Z0-9]$')),
        usuarioAvatar: Joi.string().trim().required(),
        pais: Joi.string(),
    });

    //La verificacion
    //usamos el esquema para validar lo que viene en el req.body
    //abortEarly es para que se dentenga al primer error que encuentre
    const validacion = esquema.validate(req.body,{abortEarly : false})
    
    //Respuesta al next
    console.log(validacion)
    if(validacion.error){
        res.json({success:false,errores:validacion.error})
    }
    
    next();//si no pongo esto , el controlador , que esta como 2do parametro de route.verboHTML() , no se va a ejecutar
    //pasa al siguiente controlador
}
    

module.exports = validador;