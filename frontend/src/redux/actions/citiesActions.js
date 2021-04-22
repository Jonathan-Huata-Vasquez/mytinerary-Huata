import axios from "axios";

const citiesAction = {
    obtenerCiudades: () => {
        return (dispatch,getState) =>{
            axios.get("http://localhost:4000/api/cities")
            .then(res => dispatch({
                type: "CARGAR_CIUDADES",
                payload: {
                    ciudades:res.data.respuesta,
                    loading: false
                }
            }))
            .catch(error => dispatch({
                type:"ERROR_FETCHEO",
                loading:false,
                ciudades:[]
            }))
        }
        
    }
}

export default citiesAction;