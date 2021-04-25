const initialState = {
    itinerariosCiudad : [],
    loading:true,
}

const cityItineraryReducer = (state = initialState,action) => {
    switch(action.type){
        case "CARGAR_ITINERARIOS": 
            return {
                ...state,
                itinerariosCiudad: action.payload,
                loading:false
            }

        default :
            return state;
    }
}

export default cityItineraryReducer;