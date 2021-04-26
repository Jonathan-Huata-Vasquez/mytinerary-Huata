import axios from "axios";

const citiesAction = {
    obtenerCiudades: () => {
        return (dispatch,getState) =>{
            axios.get("http://localhost:4000/api/cities")
            .then(res => dispatch({type: "CARGAR_CIUDADES",payload: res.data.respuesta}))
            .catch(error => {
                dispatch({type:"ERROR_FETCHEO",payload:null,})
                //dispatch(citiesAction.restaurarEstadoInicial())
            })
        }  
    },
    obtenerCiudadesAMostrar: (inputValor) => {
        return (dispatch,getState) => {
            dispatch({type:"CARGAR_CIUDADES_A_MOSTRAR",payload:inputValor});
        }
    },
    restaurarEstadoInicial:()=>{
        return (dispath,getState) =>{
            dispath({type:"RESTAURAR_ESTADO_INICIAL_CITIES",payload:null});
        }
    }
}

export default citiesAction;