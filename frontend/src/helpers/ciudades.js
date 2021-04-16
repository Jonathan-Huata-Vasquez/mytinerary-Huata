export  const respuestaFetch = [
    {id : 1,nombreCiudad : "Antalya",foto : "antalya.jpg"},
    {id : 2,nombreCiudad : "Bangkok",foto : "bangkok.jpg"},
    {id : 3,nombreCiudad : "Buenos Aires ",foto : "buenosAires.jpg"},
    {id : 4,nombreCiudad : "Dubai",foto : "dubai.jpg"},
    {id : 5,nombreCiudad : "Istanbul",foto : "istanbul.jpg"},
    {id : 6,nombreCiudad : "Kuala Lumpur",foto : "kualaLumpur.jpg"},
    {id : 7,nombreCiudad : "London",foto : "london.jpg"},
    {id : 8,nombreCiudad : "New Delhi",foto : "newDelhi.jpg"},
    {id : 9,nombreCiudad : "New York",foto : "newYork.jpg"},
    {id : 10,nombreCiudad : "Paris",foto : "paris.jpg"},
    {id : 11,nombreCiudad : "Rome",foto : "rome.jpg"},
    {id : 12,nombreCiudad : "Tokyo",foto : "Tokyo.jpg"},
]

export  const ciudadesCities = [
    { id: 1, nombreCiudad: "Antalya", pais: "Turkey", foto: "antalya.jpg" },
    { id: 2, nombreCiudad: "Bangkok", pais: "Thailand", foto: "bangkok.jpg" },
    { id: 3, nombreCiudad: "Buenos Aires ", pais: "Argentina", foto: "buenosAires.jpg" },
    { id: 4, nombreCiudad: "Dubai", pais: "United Arab Emirates", foto: "dubai.jpg" },
    { id: 5, nombreCiudad: "Rio de Janeiro", pais: "Brazil", foto: "rioDeJaneiro.jpg" },
    { id: 6, nombreCiudad: "Kuala Lumpur", pais: "Malaysia", foto: "kualaLumpur.jpg" },
    { id: 7, nombreCiudad: "London", pais: "England", foto: "london.jpg" },
    { id: 8, nombreCiudad: "New Delhi", pais: "India", foto: "newDelhi.jpg" },
    { id: 9, nombreCiudad: "New York", pais: "United States", foto: "newYork.jpg" },
    { id: 10, nombreCiudad: "Paris", pais: "France", foto: "paris.jpg" },
    { id: 11, nombreCiudad: "Rome", pais: "Italy", foto: "rome.jpg" },
    { id: 12, nombreCiudad: "Tokyo", pais: "Japan", foto: "Tokyo.jpg" },
    { id: 13, nombreCiudad: "Hong Kong", pais: "China", foto: "hongKong.jpg" },
    { id: 14, nombreCiudad: "Sydney", pais: "Australia", foto: "Sydney.jpg" },
    { id: 15, nombreCiudad: "Berlin", pais: "Germany", foto: "berlin.jpg" },
];

export function obtenerGruposCiudades(ciudades){
    const cantidadCiudadSlide = 4;
    const ciudadesDeGrupo = [];
    for(let i = 0; i < Math.ceil(ciudades.length/cantidadCiudadSlide); i++){
        ciudadesDeGrupo.push([])
    }
    let indiceActualGrupo = 0;
    ciudades.forEach(ciudad => {
        if(ciudadesDeGrupo[indiceActualGrupo].length >= cantidadCiudadSlide)
            indiceActualGrupo ++;
        ciudadesDeGrupo[indiceActualGrupo].push(ciudad);
    });
    return ciudadesDeGrupo;   
}