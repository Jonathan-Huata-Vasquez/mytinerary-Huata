import { endpointUserLogIn, endpointUserSignUp } from '../../helpers/endpoints'
import axios from 'axios';

const authActions = {
    crearUsuario: (valoresInputs) => {
        return async (dispatch, getState) => {
            try {
                const { data } = await axios.post(endpointUserSignUp, valoresInputs)
                if (!data.success)
                    console.log(data.error)
                dispatch({ type: "LOGUEAR_USER", payload: data.respuesta })
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
            dispatch({ type: "LOGUEAR_USER", payload: data.respuesta })
        }
    },
    logueoForzadoPorLS: (usuarioLS)=>{
        return (dispatch,getState)=>{
            dispatch({type:"LOGUEAR_USER",payload:usuarioLS});
        }
    },
    desloguearUsuario: () => {
        return (dispatch, getState) => {
            dispatch({ type: "DESLOGUEAR_USER" })
        }
    }
}

export default authActions;