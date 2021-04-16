const mongoose = require('mongoose');


//Creamos un esquema
//creamos una instancia de la clase Schema de mongoose
//que toma como parametro un objeto que seran los campos y los tipos de datos que espera MONGO
const cityEsquema = new mongoose.Schema({
    nombreCiudad: {type: String, require:true},
    pais:{type: String, require:true},
    foto:{type: String, require:true},
});

//creamos el modelo
//guardame todo lo que tenga que ver con las tareas en esta coleccio task 
//y basate siempre en mi esquema cityEsquema

const City = mongoose.model('city',cityEsquema);

/*adentro de city tengo todas las posibilidades que me da mongoose 
para grabar ,obtener , borrar  ,modificar de la base de datos*/
module.exports = City;
