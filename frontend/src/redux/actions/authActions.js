import { endpointUserLogIn, endpointUserSignUp, endpointUserLogInToken } from '../../helpers/endpoints'
import axios from 'axios';

const authActions = {
    crearUsuario: (valoresInputs) => {
        return async (dispatch, getState) => {
            try {
                const { data } = await axios.post(endpointUserSignUp, valoresInputs)
                if (!data.success)
                    console.log(data.error)
                dispatch({ type: "LOGUEAR_USER", payload: data })
            } catch (e) {
                console.log(e);
            }

        }
    },
    loguearUsuario: (usuario) => {
        return async (dispatch, getState) => {
            const { email, contrasena } = usuario;
            const { data } = await axios.post(endpointUserLogIn, { email, contrasena })
            if (!data.success) {
                return console.log(data.error);
            }
            dispatch({ type: "LOGUEAR_USER", payload: data })
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
                if(error.response.status === 401){
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