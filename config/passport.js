const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy; 

//para que sepa de donde sacar el token
const extractJwt = require('passport-jwt').ExtractJwt;

//lo necesitamos para verificar a que usuario pertenece, si es un usuario de verdad 
const User = require('../models/User');

//exportamos toda una funcion de 2 parametros
//2do parametro :una funcion de callback se ejecuta despues de que intercepta el token, en nuestro caso verifica 
module.exports = passport.use(new jwtStrategy({
    //le ponemos de donde sacamos el token , le llega en las cabeceras como un BearerToken
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    //le decimos como lo va a interpretar usando la frase de seguridad
    secretOrKey: process.env.SECRET_OR_KEY
}, (payload,done)=> {
    
    User.findById(payload._doc._id)
    .then( user => {
        if(user){
            return done(null,user) //le pone en el req una propiedad user, con los datos del usuario
        }else{
           return done(null,false) //el peticion se queda cin un error 401
        }
    })
    .catch(error => { //en caso de que no haya comunicaicon con la BD
        console.log("hubo un error en la comunicacion con la BD")
        return done(error,false)
    })
}))


/*
new Strategy
    //1er parametro recibe en un objeto en el que le especificamos jwtFromRequest y secretOrKey , que es de donde saca el token y como lo va a tratar
    //2do parametro :una funcion de callback se ejecuta despues de que intercepta el token, 
    (payload,done) , payload es lo que va a tener los datos desencriptados
    en nuestro caso verifica exista un usuario con el id que tiene encriptado el token

*/