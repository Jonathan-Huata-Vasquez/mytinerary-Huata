export  const respuestaFetch = [
    {id : 1,nombreCiudad : "Antalya",foto : "ciudades/antalya.jpg"},
    {id : 2,nombreCiudad : "Bangkok",foto : "ciudades/bangkok.jpg"},
    {id : 3,nombreCiudad : "Buenos Aires ",foto : "ciudades/buenosAires.jpg"},
    {id : 4,nombreCiudad : "Dubai",foto : "ciudades/dubai.jpg"},
    {id : 5,nombreCiudad : "Rio de Janeiro",foto : "ciudades/rioDeJaneiro.jpg"},
    {id : 6,nombreCiudad : "Kuala Lumpur",foto : "ciudades/kualaLumpur.jpg"},
    {id : 7,nombreCiudad : "London",foto : "ciudades/london.jpg"},
    {id : 8,nombreCiudad : "New Delhi",foto : "ciudades/newDelhi.jpg"},
    {id : 9,nombreCiudad : "New York",foto : "ciudades/newYork.jpg"},
    {id : 10,nombreCiudad : "Paris",foto : "ciudades/paris.jpg"},
    {id : 11,nombreCiudad : "Rome",foto : "ciudades/rome.jpg"},
    {id : 12,nombreCiudad : "Tokyo",foto : "ciudades/Tokyo.jpg"},
]



export function obtenerGruposElementos(elementos,cantidadElementosSlide = 1){
     if(cantidadElementosSlide <= 0){
        cantidadElementosSlide = 1;
     }

    let retorno = [];
    for(let i = 0; i< elementos.length; i += cantidadElementosSlide){
        let unGrupo = elementos.slice(i,i+ cantidadElementosSlide);
        retorno.push(unGrupo)
    }

    return retorno;   
}