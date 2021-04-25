import axios from "axios";
const cityItineraryActions = {
    cargarItinerarios : (idCiudad)=>{
        return (dispatch,getState)  => {
            axios.get("http://localhost:4000/api/itineraries/city/"+idCiudad)
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
    }
}
export default cityItineraryActions;