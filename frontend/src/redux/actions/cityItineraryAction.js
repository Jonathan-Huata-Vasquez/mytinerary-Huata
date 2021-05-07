import axios from "axios";
import {endpointCities,endpointActivitiesItinerary,endpointItinerariesOfCity,
    endpointItinerariesLike,endpointItinerariesOfCityLogueado,
    endpointItinerariesAgregarComentario} from "../../helpers/endpoints"
import {mostrarTostada,mostrarTostadaError500} from '../../helpers/tostadas'

const cityItineraryActions = {
    cargarItinerarios :   (idCiudad)=>{
        return async (dispatch,getState)  => {
            let usuarioLogueado = getState().authReducer.usuarioLogueado;
            try{
                const endpoint = usuarioLogueado ? endpointItinerariesOfCityLogueado :endpointItinerariesOfCity;
                let header = usuarioLogueado && {headers:{'Authorization': 'Bearer ' + usuarioLogueado.token}}
                const {data} = await axios.get(`${endpoint}/${idCiudad}`,header)
                dispatch({type : "CARGAR_ITINERARIOS",payload: data.respuesta})
            }
            catch(e){
                console.log(e)
                mostrarTostadaError500();
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
                mostrarTostadaError500()
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
                mostrarTostadaError500();
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
                return {success :true}
            }catch(e){
                console.log(e);
                mostrarTostadaError500();
                return {success :false}    
            }
        }
    },
    agregarComentario : (idItinerario,token,comentario) => {

        return async (dispatch) =>{
            try{
                let {data} = await axios.put(`${endpointItinerariesAgregarComentario}/${idItinerario}`,{comentario},{
                    
                    headers:{
                        'Authorization': 'Bearer ' + token,    
                    }
                });
                console.log(data)
                data.success
                ? dispatch({type:"ACTUALIZAR_ITINERARIO",payload:data.respuesta}) 
                : mostrarTostada("error",data.error);
            }catch(e){
                console.log(e);
                mostrarTostadaError500();
            }
            
        }
    }



}
export default cityItineraryActions;