const User = require('../models/User');
const bcryptsjs = require('bcryptjs')


const userControllers = {
    crearUsuario: async (req,res)=>{
        let {email,contrasena} = req.body;

        let respuesta;
        let error;
        try{
            let emailExiste = await User.findOne({email});
            if(!emailExiste){
                contrasena = bcryptsjs.hashSync(contrasena,10);
                let nuevoUsuario = new User({...req.body,contrasena});
                await nuevoUsuario.save();
                respuesta = nuevoUsuario;
            }else{
                error = "El email ya existe";
            }
        }catch(error){
            error = "Hubo un error al querer agregar el usuario, reintente"
        }


        res.json({
            success : !error ? true : false,
            respuesta : respuesta,
            error: error
        })
    },
    
    loguearUsuario: async(req,res)=>{
        let {email ,contrasena} = req.body;
        let respuesta , error ;
        try{
            let existeUsuario = await User.findOne({email})
            
            if(existeUsuario){
                const claveEsIgual = bcryptsjs.compareSync(contrasena,existeUsuario.contrasena)
                claveEsIgual
                ?respuesta = existeUsuario 
                :error = "Please provide a valid username and password (pass)"
                
            }else{
                error = "Please provide a valid username and password (email)"
            }
        }catch{
            error = "Hubo un error al querer loguear el usuario, reintente"
        }
        res.json({
            success: !error ? true: false,
            respuesta,
            error
        })
    }
}


module.exports = userControllers;