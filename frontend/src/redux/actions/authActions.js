import { endpointUserLogIn } from '../../helpers/endpoints'
import axios from 'axios';

const authActions = {
    crearUsuario: () => {
        return (dispatch, getState) => {

        }
    },
    loguearUsuario: (usuario) => {
        return async (dispatch, getState) => {
            const { email, contrasena } = usuario;
            const {data} = await axios.post(endpointUserLogIn, { email, contrasena })
            console.log(data)
            if(!data.success){
                return console.log(data.error) ;
            }
            dispatch({type:"LOGUEAR_USER", payload: data.respuesta})
        }
    },
    desloguearUsuario: () => {
        return (dispatch, getState) => {

        }
    }
}

export default authActions;