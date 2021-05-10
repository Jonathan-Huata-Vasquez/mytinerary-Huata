import { endpointUserLogIn, endpointUserSignUp, endpointUserLogInToken } from '../../helpers/endpoints'
import axios from 'axios';
import {mostrarTostada} from '../../helpers/tostadas'
const authActions = {
    crearUsuario: (valoresInputs) => {
        return async (dispatch, getState) => {
            try {
                const { data } = await axios.post(endpointUserSignUp, valoresInputs)
                if (!data.success){
                    return data.errores;    
                }
                mostrarTostada("success",`Welcome ${data.respuesta.nombreCompleto}` ,"top-right");
                dispatch({ type: "LOGUEAR_USER", payload: data.respuesta })
            } 
            catch (e) {//error en la comunicacion con el backend
                console.log(e);
                alert("Error 500 , please come back later")
            }

        }
    },
    loguearUsuario: (usuario,history) => {
        return async (dispatch, getState) => {
            //obtengo respuesta y la destructuro
            const { data } = await axios.post(endpointUserLogIn, usuario)
            if (!data.success) {
                return data.error;
            }
            mostrarTostada("success",`Welcome ${data.respuesta.nombreCompleto}` ,"top-right");
            dispatch({ type: "LOGUEAR_USER", payload: data.respuesta})
        }
    },

    logueoForzadoPorLS: (token,history)=>{
        return async (dispatch,getState)=>{
            try {
                const {data} = await axios.get(endpointUserLogInToken,{
                    headers:{'Authorization': 'Bearer ' + token}
                })
                dispatch({type:"LOGUEAR_USER",payload: {
                    ...data.respuesta,
                    token
                }});
            } 
            catch (err) {
                alert("Error 500 , please come back later")
                console.log(err)
                if(err.response && err.response.status === 401){
                    alert("try harder next time")
                    localStorage.clear();
                    window.location.reload(true);
                    //history.push("/");
                }
            }
        }
    },
    desloguearUsuario: () => {
        return (dispatch, getState) => {
            mostrarTostada("info","Come back later " ,"top-right");
            dispatch({ type: "DESLOGUEAR_USER" })
        }
    }
}

export default authActions;