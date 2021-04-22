const inicialState = {
    //estadoCities : {
        ciudadesAMostrar: [],
        todasLasCiudades: [],
        loading: true
    //}
}

const citiesReducer = (state = inicialState,action) => {
    switch(action.type){
        case "CARGAR_CIUDADES": 
            return {
                ...state,
                //estadoCities: {
                  //  ...state.estadoCities,
                    ciudadesAMostrar: action.payload.ciudades,
                    todasLasCiudades: action.payload.ciudades,
                    loading: false
                //}
            }
        case "ERROR_FETCHEO":{
            return{
                ...state,
                todasLasCiudades: action.payload.ciudades,
                loading: false
            }
        }
        default :
            return state;
    }
}

export default citiesReducer;