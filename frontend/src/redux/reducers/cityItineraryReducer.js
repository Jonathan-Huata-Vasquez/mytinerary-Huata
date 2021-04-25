const initialState = {
    itinerariosCiudad : [],
    loading:true,
    error500Itinerarios: false,
}

const cityItineraryReducer = (state = initialState,action) => {
    switch(action.type){
        case "CARGAR_ITINERARIOS": 
            return {
                ...state,
                itinerariosCiudad: action.payload,
                loading:false
            }
            case "ERROR_CARGAR_ITINERARIOS": 
                return{
                    ...state ,
                    loading:false,
                    error500Itinerarios : true
                }
            case "RESTAURAR_ITINERARIOS":
                return initialState; 
        default :
            return state;
    }
}

export default cityItineraryReducer;