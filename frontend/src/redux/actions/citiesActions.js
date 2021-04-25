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
            .catch(error => {
                return  dispatch({
                type:"ERROR_FETCHEO",
                loading:false,
                ciudades:[]
            })}
            )
        }  
    },
    obtenerCiudadesAMostrar: (inputValor) => {
        return (dispatch,getState) => {
            dispatch({type:"CARGAR_CIUDADES_A_MOSTRAR",payload:inputValor});
        }
    },
    cargarEstadoInicial:()=>{
        return (dispath,getState) =>{
            dispath({type:"CARGAR_ESTADO_INICIAL",payload:null});
        }
    }
}

export default citiesAction;