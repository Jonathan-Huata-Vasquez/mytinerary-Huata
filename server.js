const express = require(`express`);
const cors = require(`cors`)
const app = express();

let ciudades = [
    {id : 1,nombreCiudad : "Antalya",pais: "Turkey",foto : "antalya.jpg"},
    {id : 2,nombreCiudad : "Bangkok",pais: "Thailand",foto : "bangkok.jpg"},
    {id : 3,nombreCiudad : "Buenos Aires ",pais: "Argentina",foto : "buenosAires.jpg"},
    {id : 4,nombreCiudad : "Dubai",pais: "United Arab Emirates",foto : "dubai.jpg"},
    {id : 5,nombreCiudad : "Rio de Janeiro",pais: "Brazil",foto : "rioDeJaneiro.jpg"},
    {id : 6,nombreCiudad : "Kuala Lumpur",pais: "Malaysia",foto : "kualaLumpur.jpg"},
    {id : 7,nombreCiudad : "London",pais: "England",foto : "london.jpg"},
    {id : 8,nombreCiudad : "New Delhi",pais: "India",foto : "newDelhi.jpg"},
    {id : 9,nombreCiudad : "New York",pais: "United States",foto : "newYork.jpg"},
    {id : 10,nombreCiudad : "Paris",pais: "France",foto : "paris.jpg"},
    {id : 11,nombreCiudad : "Rome",pais: "Italy",foto : "rome.jpg"},
    {id : 12,nombreCiudad : "Tokyo",pais: "Japan",foto : "Tokyo.jpg"},
    {id : 13,nombreCiudad : "Hong Kong",pais: "China",foto : "hongKong.jpg"},
    {id : 14,nombreCiudad : "Sydney",pais: "Australia",foto : "Sydney.jpg"},
    {id : 15,nombreCiudad : "Berlin",pais: "Germany",foto : "berlin.jpg"},
]

//frente a cualquier tipo de pedidos, aplica Cors
app.use(cors())

//Obtener todoas las ciudades
app.get("/api/cities", (req,res)=>{
    //envia una respuesta, puede contener HTML dentro del string
    res.json( { respuesta:ciudades } )
})

//Borrar una ciudad por Id
//con los ":" le estamos diciendo que despues de la barra le va a venir algo dinamico
app.delete("/api/deleteCity/:idABorrar", (req,res)=>{
    const idCapturado = parseInt(req.params.idABorrar);
    ciudades = ciudades.filter(ciudad => ciudad.id !== idCapturado);
    res.json({respuesta:ciudades});
})







//le especifico en que puerto 4000 estara escuchando, ejecutara la funcion callback una vez que que la app ya este cuchando en el puerto 4000
app.listen(4000, ()=> console.log("App escuchando en el puerto 4000"));
//El listen siempre va al final