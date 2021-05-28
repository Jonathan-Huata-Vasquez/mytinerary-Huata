const Joi = require('joi')


const validador = (req,res,next) => {
    //Creamos un esquema para que se use al validar lo que nos viene en el body
    //un objeto que tiene como propiedad los nombres de los campos y como valor las validaciones que hace y sus mensajes de error
    const esquema = Joi.object({
        nombre: Joi.string().min(2).max(25).required().pattern(new RegExp(/^[a-z ' ñ á é í ó ú]{2,}$/i))
        .messages({
            "string.pattern.base": "your First name must not have numbers or special characters",
            "string.min": "requires at least 2 letters",
            "string.max": "maximum characters exceeded (25)",
        }),


        apellido: Joi.string().min(2).max(25).required().pattern(new RegExp(/^[a-z ' ñ á é í ó ú]{2,}$/i))
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
        //usuarioAvatar: Joi.string().required(),

        pais: Joi.string().allow('').required(),
    });

    //La verificacion
    //usamos el esquema para validar lo que viene en el req.body
    //abortEarly es para que se dentenga al primer error que encuentre
    //esquema.validate() retorna un objeto que entre las propiedades esta "error" que contendra detalles de los errores y sus menssages
    const validacion = esquema.validate(req.body,{abortEarly : false})

    
    if(validacion.error){
        const respuestaErrores = validacion.error.details.map(error => {return {message:error.message,label: error.context.label}})
        return res.json({success:false,errores:respuestaErrores})
    }
    
    next();//si no pongo esto , el controlador , que esta como 2do parametro de route.verboHTML() , no se va a ejecutar
    //pasa al siguiente controlador
}
    

module.exports = validador;


/*
pattern - a pattern that can be either a regular expression or a joi schema 
 it must begin with ^ and end with $
*/
//  /^[a-z ']{2,}$/i    acepta letras de a-z (y mayusculas gracias a la flag /i) y el apostrofe , 
//                      como minimo tiene que tener 2 de esos caracteres

// /(?=.*\d)(?=.*[A-z])/  

/* 
    (?=.*\d)
    (?= ) requiere
    * 0 o mas veces con el elemento anterior
    .  Coincide con cualquier carácter único excepto terminadores de línea: \n, \r, \u2028 o \u2029
    \d  Equivalente a [0-9]

   (?=.*[A-z])
   requiere 0 o mas veces que coincidad con cualquiera de los caracteres [A-z](salvo saltos de linea o tabulaciones) 


   /(?=.*\d)(?=.*[A-z]){2,}/   si tuviera esto me obliga a poner 0 o mas digitos y 2 o mas 
*/