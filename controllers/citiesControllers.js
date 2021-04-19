

const City = require('../models/City');
//como todo lo que manejemos con BD son procesos asincronos
//entonces usaremos async await (porque es mas prolijo) 
//entonces los controladores son asincronos y lo que esperan son las peticiones a la BD


//es un objeto que tendra como propiedades ,los nombres de los controladores 
//y como  sus valores , los controladores 
const citiesControllers = {
    obtenerTodasLasCiudades: async (req, res) => {
        try {
            //buscame aquellas ciudades que cumplan con este criterio () si no le ponemos nada, nos trae todo
            const ciudadesObtenidas = await City.find();
            res.json({ success: true, respuesta: ciudadesObtenidas });

        }
        catch (e) {
            res.json({ success: false, respuesta: "an error occurred while getting the cities" })
        }

    },
    agregarCiudad: async (req, res) => {
        //destructuramos lo que viene en el body
        const { nombreCiudad, pais, foto } = req.body;
        //creamos una instancia de City 
        /*va al modelo y se fija si lo que esta en el modelo corresponde 
        con lo que tengo como propiedades y valores
        Si en el frontend mando una propiedad , desconocida, aca no la toma(en mi codigo)
        Si le mando bien la propiedad pero no el tipo de dato del valor, la base de datos no guarda esa propiedad
        */

        let ciudadNueva = new City({
            nombreCiudad: nombreCiudad,
            pais: pais,
            foto: foto
        });
        try {
            //de la instancia le uso el metodo heredado save()
            await ciudadNueva.save();
            const todasLasCIudades = await City.find(); //find me devuelve un array
            res.json({ respuesta: todasLasCIudades })
        }
        catch (e) {
            res.json({ success: false, respuesta: "an error occurred while adding the city: "+e })
        }

    },


    obtenerCiudad: async (req, res) => {
        const id = req.params.id;
        try {
            const ciudadBuscada = await City.findById(id) //findById me devuelve un objeto
            res.json({ success: true, respuesta: ciudadBuscada });
        }
        catch (e) {
            res.json({ success: false, respuesta: "an error occurred while getting the city" })
        }
    },


    borrarCiudad: async (req, res) => {//Borrar una ciudad por Id
        const id = req.params.id;
        try {
            const ciudadBorrada = await City.findByIdAndDelete(id); //devuelve una Query, el objeto que borramos de la BD
            res.json({ success: true, respuesta: ciudadBorrada });
        }
        catch (e) {
            res.json({ success: false, respuesta: "there was an error deleting the city with the id: "+id })
        }

    },


    actualizarCiudad: async (req, res) => {//Actualizar valores de una ciudad por Id
        const id = req.params.id
        try {
            //findOneAndUpdate, retorna una Query 
            //1er parametro le mandamos el id del elemento a actualizar
            //2do parametro le mandamos las nuevas propiedades y valores a actualizar
            //3er parametro es para  que query retornada sea la actualizada (true)
            const ciudadModificada = await City.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
            //no importta si se le manda una propiedad desconocida ya que City utiliza el esquema que tiene para actualizar
            //y ignora las propiedades desconocidas
            res.json({success:true, respuesta: ciudadModificada });
        }
        catch (e) {
            res.json({ success: false, respuesta: "hubo un error al actualizar la ciudad" })
        }

    },

    /*Para el programador */
    agregarArrayCiudades: async (req, res) => {
        const arrayCiudades = req.body;
        
        /*
            El método Promise.all(iterable) devuelve una promesa que termina correctamente cuando todas las promesas 
            en el argumento iterable han sido concluídas con éxito, o bien rechaza la petición con el motivo pasado 
            por la primera promesa que es rechazada.
        */
        try {
            //no funcion con el foreach porque no devuele la promesa
            await Promise.all(arrayCiudades.map(ciudad => {
                let nuevaCiudad = new City({ ...ciudad })
                return nuevaCiudad.save();
            }));
            res.json({ success: true, respuesta: "se agregaron todas las ciudades correctamente" })
            /*
            arrayCiudades.map(async (ciudad) => {
                let nuevaCiudad =  new City({ ...ciudad })
                await nuevaCiudad.save();
            });
            res.json({success:true})*/
        }
        catch (e) {
            res.json({ success: false, respuesta: ```hubo un error al agregar las ciudades  error : ${e}``` })
        }

    },
    obtenerJSONCiudadesIniciales:  (req, res) => {
        const ciudadesCities = [
            { nombreCiudad: "Antalya", pais: "Turkey", foto: "antalya.jpg" },
            { nombreCiudad: "Bangkok", pais: "Thailand", foto: "bangkok.jpg" },
            { nombreCiudad: "Buenos Aires ", pais: "Argentina", foto: "buenosAires.jpg" },
            { nombreCiudad: "Dubai", pais: "United Arab Emirates", foto: "dubai.jpg" },
            { nombreCiudad: "Rio de Janeiro", pais: "Brazil", foto: "rioDeJaneiro.jpg" },
            { nombreCiudad: "Kuala Lumpur", pais: "Malaysia", foto: "kualaLumpur.jpg" },
            { nombreCiudad: "London", pais: "England", foto: "london.jpg" },
            { nombreCiudad: "New Delhi", pais: "India", foto: "newDelhi.jpg" },
            { nombreCiudad: "New York", pais: "United States", foto: "newYork.jpg" },
            { nombreCiudad: "Paris", pais: "France", foto: "paris.jpg" },
            { nombreCiudad: "Rome", pais: "Italy", foto: "rome.jpg" },
            { nombreCiudad: "Tokyo", pais: "Japan", foto: "Tokyo.jpg" },
            { nombreCiudad: "Hong Kong", pais: "China", foto: "hongKong.jpg" },
            { nombreCiudad: "Sydney", pais: "Australia", foto: "Sydney.jpg" },
            { nombreCiudad: "Berlin", pais: "Germany", foto: "berlin.jpg" },
        ];
        res.json({ respuesta: ciudadesCities });
    }
}

module.exports = citiesControllers;