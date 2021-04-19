const mongoose = require('mongoose');
//para la direccion
//le modificamos el <password> y el nombre luego de .net/ y antes del '?'
//si el password o el usuario no esta bien , lanza un error de autenticidad

//1er parametro direccion de la base de datos
//ya sea una bd local o una bd en la nube
//2do parametro es un objeto con opciones con el funcionamiento interno de Mongo
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true, //tiene que poder parsear url con un nuevo parseador
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})//como esto metodo devuelve una promesa, lo tratamos con then y catch
.then(()=> console.log("Database connected") )
.catch(error=> console.log(error))

