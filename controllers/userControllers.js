const User = require('../models/User');
const bcryptsjs = require('bcryptjs')
const jwToken = require('jsonwebtoken');
//para crear un token se usa el metodo sign 
//1er parametro tiene que ser un objeto simple que voy a guardar.jwt.sign() 
//  requiere un objeto simple (un objeto literal o plano), no acepta objetos instanciados 
//2do parametro tiene que ser la frase de seguridad que sirve para luego desencriptar
/*
el token se va a generar agarrando la informacion y grabandolo , teniendo en cuenta esa frase,
para desencriptar el token se necesita la frase de seguridad
*/
const userControllers = {
    crearUsuario: async (req, res) => {
        let { email, contrasena } = req.body;
        let respuesta, errores;
        try {
            let emailExiste = await User.findOne({ email });
            if (!emailExiste) {
                contrasena = bcryptsjs.hashSync(contrasena, 10);
                let nuevoUsuario = new User({ ...req.body, contrasena });
                await nuevoUsuario.save();
                
                respuesta = {
                    nombreCompleto : nuevoUsuario.nombre + nuevoUsuario.apellido,
                    usuarioAvatar : nuevoUsuario.usuarioAvatar,
                    token:  jwToken.sign({ ...nuevoUsuario }, process.env.SECRET_OR_KEY)
                }
            } else {
                errores = [{
                    message:"This email is already in use, choose another",
                    label:"email"
                }];
            }
        } catch (error) {
            console.log(error)
            errores = [{
                message:"Error BD",
                label:""
            }];
        }

        res.json({
            success: !errores ? true : false,
            respuesta,
            errores
        })
    },

    loguearUsuario: async (req, res) => {
        let { email, contrasena } = req.body;
        let respuesta, error;
        try {
            let existeUsuario = await User.findOne({ email })

            if (existeUsuario) {
                const claveEsIgual = bcryptsjs.compareSync(contrasena, existeUsuario.contrasena)
                if(claveEsIgual){
                    respuesta = {
                        nombreCompleto : existeUsuario.nombre +" "+existeUsuario.apellido,
                        usuarioAvatar : existeUsuario.usuarioAvatar,
                        token  : jwToken.sign({...existeUsuario},process.env.SECRET_OR_KEY),
                    }
                    
                }else{
                    error = "Please provide a valid email and password "  
                }
            } else {
                error = "Please provide a valid email and password "
            }
        } catch(e) {
            console.log(e)
            error = "Hubo un error al querer loguear el usuario, reintente"
        }
        res.json({
            success: !error ? true : false,
            respuesta,
            error
        })
    },
    loginForzado : (req,res) => {
        res.json({success:true, respuesta: req.user.usuarioAvatar})
    }
}


module.exports = userControllers;