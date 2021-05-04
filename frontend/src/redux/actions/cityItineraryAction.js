import axios from "axios";
import {endpointActivitiesItinerary,endpointItinerariesOfCity} from "../../helpers/endpoints"
import {mostrarTostada} from '../../helpers/tostadas'

const cityItineraryActions = {
    cargarItinerarios : (idCiudad)=>{
        return (dispatch,getState)  => {
            axios.get(`${endpointItinerariesOfCity}/${idCiudad}`)
            .then(res => dispatch({
                type : "CARGAR_ITINERARIOS",
                payload: res.data.respuesta
            }))
            .catch(error => dispatch({type : "ERROR_CARGAR_CIUDAD", payload:null}))
        }
    },
    restaurarItinerarios: ()=>{
        return (dispatch,getState) =>{
            dispatch({type:"RESTAURAR_ITINERARIOS",payload:null});
        }
    },
    cargarActividadesDeItinerario : async (itinerarioId) =>{
        return async ()=>{
            try {
                let {data} = await axios.get(`${endpointActivitiesItinerary}/${itinerarioId}`)
                if(data.success)
                    return data.respuesta;
                else
                    mostrarTostada("error",data.error,"top-right")    
            } catch (error) {
                console.log(error);
                mostrarTostada("error","ups, somethin went wrong, pls try again","top-right")    
            }
        }
    }
}
export default cityItineraryActions;