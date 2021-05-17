import { endpointUserLogIn, endpointUserSignUp, endpointUserLogInToken } from '../../helpers/endpoints'
import axios from 'axios';
import { mostrarTostada, mostrarTostadaError500 } from '../../helpers/tostadas'
const authActions = {
    crearUsuario: (valoresInputs) => {
        return async (dispatch, getState) => {
            try {
                const { data } = await axios.post(endpointUserSignUp, valoresInputs)
                if (!data.success) {
                    return data.errores;
                }
                mostrarTostada("success", `Welcome ${data.respuesta.nombreCompleto}`, "top-right");
                dispatch({ type: "LOGUEAR_USER", payload: data.respuesta })
            }
            catch (e) {//error en la comunicacion con el backend
                console.log(e);
                mostrarTostadaError500();
            }

        }
    },
    loguearUsuario: (usuario, history) => {
        return async (dispatch, getState) => {
            //obtengo respuesta y la destructuro
            try {
                const { data } = await axios.post(endpointUserLogIn, usuario)
                console.log(data)
                if (!data.success) {
                    return data.error;
                }
                mostrarTostada("success", `Welcome ${data.respuesta.nombreCompleto}`, "top-right");
                dispatch({ type: "LOGUEAR_USER", payload: data.respuesta })

            } catch (err) {
                mostrarTostadaError500();
            }

        }
    },

    logueoForzadoPorLS: (token, history) => {
        return async (dispatch, getState) => {
            try {
                const { data } = await axios.get(endpointUserLogInToken, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                dispatch({
                    type: "LOGUEAR_USER", payload: {
                        ...data.respuesta,
                        token
                    }
                });
            }
            catch (err) {
                alert("Error 500 , please come back later")
                console.log(err)
                if (err.response && err.response.status === 401) {
                    alert("try harder next time")
                    localStorage.clear();
                    window.location.reload(true);
                    //history.push("/");
                }
                mostrarTostadaError500();
                localStorage.clear();
            }
        }
    },
    desloguearUsuario: () => {
        return (dispatch, getState) => {
            mostrarTostada("info", "Come back later ", "top-right");
            dispatch({ type: "DESLOGUEAR_USER" })
        }
    }
}

export default authActions;