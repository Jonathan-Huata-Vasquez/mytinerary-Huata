const initialState = {
    itinerariosCiudad: [],
    loading: true,
}

const cityItineraryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CARGAR_ITINERARIOS":
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
        case "RESTAURAR_ITINERARIOS":
            return initialState;
        default:
            return state;
    }
}

export default cityItineraryReducer;