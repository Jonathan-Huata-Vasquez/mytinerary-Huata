import { endpointUserLogIn, endpointUserSignUp, endpointUserLogInToken } from '../../helpers/endpoints'
import axios from 'axios';

const authActions = {
    crearUsuario: (valoresInputs) => {
        return async (dispatch, getState) => {
            try {
                const { data } = await axios.post(endpointUserSignUp, valoresInputs)
                if (!data.success){
                    return data.errores;    
                }
                dispatch({ type: "LOGUEAR_USER", payload: data })
            } 
            catch (e) {//error en la comunicacion con el backend
                console.log(e);
                alert("Error 500 , please come back later")
            }

        }
    },
    loguearUsuario: (usuario) => {
        return async (dispatch, getState) => {
            //obtengo respuesta y la destructuro
            const { data } = await axios.post(endpointUserLogIn, usuario)
            if (!data.success) {
                return data.error;
            }
            dispatch({ type: "LOGUEAR_USER", payload: {
                token:data.token,
                usuarioAvatar:data.usuarioAvatar
            }})
        }
    },

    logueoForzadoPorLS: (token)=>{
        return async (dispatch,getState)=>{
            try {
                const {data} = await axios.get(endpointUserLogInToken,{
                    headers:{'Authorization': 'Bearer '+token}
                })
                dispatch({type:"LOGUEAR_USER",payload: {
                    token,
                    usuarioAvatar:data.respuesta
                }});
            } 
            catch (error) {
                alert("Error 500 , please come back later")
                //console.log(error.response)
                if(error.response && error.response.status === 401){
                    alert("try harder next time")
                }
            }
        }
    },
    desloguearUsuario: () => {
        return (dispatch, getState) => {
            dispatch({ type: "DESLOGUEAR_USER" })
        }
    }
}

export default authActions;