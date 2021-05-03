const Joi = require('joi')


const validador = (req,res,next) => {
    //Esquema
    const esquema = Joi.object({
        nombre: Joi.string().min(2).max(25).required().pattern(new RegExp(/^[a-z ']{2,}$/i))
        .messages({
            "string.pattern.base": "your First name must not have numbers or special characters",
            "string.min": "requires at least 2 letters",
            "string.max": "maximum characters exceeded (25)",
        }),


        apellido: Joi.string().min(2).max(25).required().pattern(new RegExp(/^[a-z ']{2,}$/i))
        .messages({
            "string.pattern.base": "your Last name must not have numbers or special characters",
            "string.min": "requires at least 2 letters",
            "string.max": "maximum characters exceeded (25)",
        }),
        email: Joi.string().required().email()
        .messages({
            "string.email": "Please provide a valid email address. Por ejemplo test@example.com"
        }),
        contrasena: Joi.string().min(6).required().pattern(new RegExp(/(?=.*\d)(?=.*[A-z])/))
        .messages({
            "string.pattern.base": "Your password must contain letters and numbers",
            "string.min": "requires at least 6 characters",
        }),
        usuarioAvatar: Joi.string().required(),

        pais: Joi.string().allow('').required(),
    });

    //La verificacion
    //usamos el esquema para validar lo que viene en el req.body
    //abortEarly es para que se dentenga al primer error que encuentre
    const validacion = esquema.validate(req.body,{abortEarly : false})
    
    if(validacion.error){
        const respuestaErrores = [] 
        validacion.error.details.forEach(error => {
            respuestaErrores.push({message:error.message,label: error.context.label})
        })
        return res.json({success:false,errores:respuestaErrores})
    }
    
    next();//si no pongo esto , el controlador , que esta como 2do parametro de route.verboHTML() , no se va a ejecutar
    //pasa al siguiente controlador
}
    

module.exports = validador;