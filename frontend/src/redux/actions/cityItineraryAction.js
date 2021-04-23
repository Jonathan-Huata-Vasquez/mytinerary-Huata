import axios from "axios";
const cityItineraryActions = {
    cargarCiudad : (id)=>{
        return (dispatch,getState)  => {
            axios.get("http://localhost:4000/api/cities/"+id)
            .then(res => dispatch({
                type : "CARGAR_CIUDAD",
                payload: res.data.respuesta
            }))
            .catch(res => dispatch({type : "ERROR_CARGAR_CIUDAD",payload: res.data.respuesta}))
        }
    }
}
export default cityItineraryActions;