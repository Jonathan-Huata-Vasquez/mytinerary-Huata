const mongoose = require('mongoose');

//le modificamos el <password> y el nombre luego de .net/ y antes del '?'
//si el password o el usuario no esta bien , lanza un error de autenticidad
const direccion = "mongodb+srv://JonathanHuata:40956841@cluster0.pmzuu.mongodb.net/myTinerary?retryWrites=true&w=majority"

//direccion de la base de datos
//ya sea una bd local o una bd en la nube
//2do parametro es un objeto con opciones con el funcionamiento interno de Mongo
mongoose.connect(direccion,{
    useNewUrlParser:true, //tiene que poder parsear url con un nuevo parseador
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})//como esto metodo devuelve una promesa, lo tratamos con then y catch
.then(()=> console.log("Database connected") )
.catch(error=> console.log(error))

