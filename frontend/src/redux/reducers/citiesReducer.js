const inicialState = {
    ciudadesAMostrar: [],
    todasLasCiudades: [],
    loading: true,
    error500:false
}

const citiesReducer = (state = inicialState, action) => {
    switch (action.type) {
        case "CARGAR_CIUDADES":
            return {
                ...state,
                ciudadesAMostrar: action.payload,
                todasLasCiudades: action.payload,
                loading: false
            }


        case "CARGAR_CIUDADES_A_MOSTRAR":
            let nuevasCiudades ;
            let valorInput = action.payload;
            if(valorInput === ""){
                nuevasCiudades = state.todasLasCiudades;
            }else{
                nuevasCiudades = state.todasLasCiudades.filter(ciudad => {
                    return ciudad.nombreCiudad.trim().toLowerCase().startsWith(action.payload.trim().toLowerCase());
                });
            }
            return {
                ...state,
                ciudadesAMostrar: nuevasCiudades
            } 
        case "ERROR_FETCHEO": 
            return {
                ...state,
                loading: false,
                error500:true
            }
        
        case "RESTAURAR_ESTADO_INICIAL_CITIES":
            return inicialState;
        default:
            return state;
           
    }
}

export default citiesReducer;