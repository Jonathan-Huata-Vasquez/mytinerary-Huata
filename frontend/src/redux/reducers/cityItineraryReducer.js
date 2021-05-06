const initialState = {
    itinerariosCiudad: [],
    loading: true,
}

const cityItineraryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CARGAR_ITINERARIOS":
            console.log(action)
            return {
                ...state,
                itinerariosCiudad: action.payload,
                loading: false
            }
        case "ERROR_CARGAR_ITINERARIOS":
            return {
                ...state,
                loading: false,
            }
        case "ACTUALIZAR_ITINERARIO":
            let itinerariosActualizados = state.itinerariosCiudad.map(itinerario =>{
                if(itinerario._id === action.payload._id)
                    return action.payload;
                return itinerario;
            })
            return {
                ...state,
                itinerariosCiudad: itinerariosActualizados
            } 
        case "RESTAURAR_ITINERARIOS":
            return initialState;
        default:
            return state;
    }
}

export default cityItineraryReducer;