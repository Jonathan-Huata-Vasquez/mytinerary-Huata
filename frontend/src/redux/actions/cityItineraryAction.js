import axios from "axios";
import {endpointCities,endpointActivitiesItinerary,endpointItinerariesOfCity,
    endpointItinerariesLike,endpointItinerariesOfCityLogueado} from "../../helpers/endpoints"
import {mostrarTostada} from '../../helpers/tostadas'

const cityItineraryActions = {
    cargarItinerarios :   (idCiudad)=>{
        return async (dispatch,getState)  => {
            let usuarioLogueado = getState().authReducer.usuarioLogueado;
            console.log(usuarioLogueado)
            try{
                const endpoint = usuarioLogueado ? endpointItinerariesOfCityLogueado :endpointItinerariesOfCity;
                console.log(endpoint)
                let header = usuarioLogueado && {headers:{'Authorization': 'Bearer ' + usuarioLogueado.token}}
                const {data} = await axios.get(`${endpoint}/${idCiudad}`,header)
                dispatch({type : "CARGAR_ITINERARIOS",payload: data.respuesta})
            }
            catch(e){
                console.log(e)
                mostrarTostada("error","ups, something went wrong, pls try again","top-right")    
                dispatch({type : "ERROR_CARGAR_CIUDAD", payload:null})
            }

            
        }
    },
    cargarCiudad : (idCiudad)=>{
        return  async () => {
            try{
                let {data} = await axios.get(`${endpointCities}/${idCiudad}`)
                if(data.success){
                    return data.respuesta;}
                else{
                    mostrarTostada("error",data.error,"top-right");
                }//getState()

            }catch(e){
                mostrarTostada("error","ups, something went wrong, pls try again","top-right")    
            }
            
        }
    },
    restaurarItinerarios: ()=>{
        return (dispatch,getState) =>{
            dispatch({type:"RESTAURAR_ITINERARIOS",payload:null});
        }
    },
    cargarActividadesDeItinerario :  (itinerarioId) =>{  
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
    },
    likearItinerario : (token,idItinerario) => {
        return async (dispatch,getState) => {
            try{
                const {data} = await axios.get(`${endpointItinerariesLike}/${idItinerario}`,{
                    headers:{'Authorization': 'Bearer ' + token}
                })
                dispatch({type:"ACTUALIZAR_ITINERARIO",payload:data.respuesta})
            }catch(e){
                console.log(e);
                mostrarTostada("error","ups, somethin went wrong, pls try again","top-right")    
            }
        }
    }



}
export default cityItineraryActions;