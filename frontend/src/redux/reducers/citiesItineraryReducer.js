const initialState = {
    ciudadActual = {},
    loading:true,
}

const citiesItineraryReducer = (state = initialState,action) => {
    switch(action.type){
        case "CARGAR_CIUDAD": 
            return {
                ...state,
                ciudadActual: action.payload,
                loading:false
            }

        default :
            return state;
    }
}
