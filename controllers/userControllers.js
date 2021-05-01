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

        let respuesta, error;
        let usuarioAvatar;
        try {
            let emailExiste = await User.findOne({ email });
            if (!emailExiste) {
                contrasena = bcryptsjs.hashSync(contrasena, 10);
                let nuevoUsuario = new User({ ...req.body, contrasena });
                await nuevoUsuario.save();
                const token = jwToken.sign({ ...nuevoUsuario }, process.env.SECRET_OR_KEY);
                usuarioAvatar = nuevoUsuario.usuarioAvatar;
                respuesta = token;
            } else {
                error = "El email ya existe";
            }
        } catch (error) {
            error = "Hubo un error al querer agregar el usuario, reintente";
        }


        res.json({
            success: !error ? true : false,
            token: respuesta,
            usuarioAvatar,
            error: error
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
                    respuesta = jwToken.sign({...existeUsuario},process.env.SECRET_OR_KEY)
                    usuarioAvatar = existeUsuario.usuarioAvatar;
                }else{
                    error = "Please provide a valid username and password (pass)"  
                }
            } else {
                error = "Please provide a valid username and password (email)"
            }
        } catch {
            error = "Hubo un error al querer loguear el usuario, reintente"
        }
        res.json({
            success: !error ? true : false,
            token: respuesta,
            usuarioAvatar,
            error
        })
    },
    loginForzado : (req,res) => {
        res.json({success:true, respuesta: req.user.usuarioAvatar})
    }
}


module.exports = userControllers;