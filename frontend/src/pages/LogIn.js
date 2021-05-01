import React from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux'
import authActions from '../redux/actions/authActions';
import GoogleLogin from 'react-google-login';
const estilos = ({
    inputEstilo: {
        width: "80%",
        minWidth: "236px",
        marginTop: "1.5rem"
    },
    btnGoogle: {
        backgroundColor: "#343a40",
        color: "white",
        transition: "transform,0.25s",
        '&:hover': {
            backgroundColor: "#01579b",

            transform: "scale(1.1)"
        }
    }
})
class LogIn extends React.Component {
    state = {
        visibleContrasena: false,
        valoresInputs: {
            email: "",
            contrasena: ""
        }

    }
    leerInput(e) {
        this.setState({
            ...this.state,
            valoresInputs: {
                ...this.state.valoresInputs,
                [e.target.name]: e.target.value
            }
        });
    }

    cambiarVisibilidadContrasena() {
        this.setState({
            ...this.state,
            visibleContrasena: !this.state.visibleContrasena
        })
    }
    respuestaGoogle(response) {
        if (!response.profileObj) {//en caso de que el usuario cierre el popup
            return null;
        }
        const usuarioGoogle = response.profileObj;
        this.enviar({
            email: usuarioGoogle.email,
            contrasena: "google" + usuarioGoogle.googleId + "myTinerary",
        }, true)
    }

    enviar(objUsuario, conGoogle = false) {
        if (!conGoogle) {
            const { email, contrasena } = this.state.valoresInputs;
            if (email === "" || contrasena === "") {
                console.log("hay campos vacios");
                return null;
            }
        }
        console.log(objUsuario)
        this.props.loguearUsuario(objUsuario)
    }

    render() {
        const { classes: misEstilos } = this.props;
        return (
            <div className="contenedorLogIn">
                <h2>Log in to your account</h2>
                <div className="contenedorFormularioBtnGoogle">
                    <Button
                        className={misEstilos.btnGoogle}
                        variant="contained"
                        startIcon={<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fillRule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path><path fill="none" d="M0 0h18v18H0z"></path></g></svg>}
                    >  Log in with Google  </Button>
                    <GoogleLogin
                        clientId="915285624748-bcfmc9ot4g7uqtc1q3rf1n7qvf1o7pbi.apps.googleusercontent.com"
                        buttonText="Sign up"
                        onSuccess={(response)=>this.respuestaGoogle(response)}
                        onFailure={(response)=>this.respuestaGoogle(response)}
                        cookiePolicy={'single_host_origin'}
                    />    
                    
                    <div className="separador">
                        <h5>Or</h5>
                    </div>

                    <form className="formulario">
                        <TextField
                            name="email"
                            label="Email"
                            variant="outlined"
                            className={misEstilos.inputEstilo}
                            onChange={(e) => this.leerInput(e)}
                            value={this.state.valoresInputs.email}
                        />

                        <FormControl variant="outlined" className={misEstilos.inputEstilo}>
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput
                                name="contrasena"
                                type={this.state.visibleContrasena ? 'text' : 'password'}
                                value={this.state.valoresInputs.contrasena}
                                onChange={(e) => this.leerInput(e)}
                                endAdornment={ //pongo al final el icono
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => this.cambiarVisibilidadContrasena()}
                                            edge="end" //para darle un margin respecto a su espacio reservado
                                        >
                                            {this.state.visibleContrasena ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70} //el ancho del label cuando esta focuseado
                            />
                        </FormControl>

                        <Button variant="contained" color="primary" className="mt-3" onClick={() => this.enviar(this.state.valoresInputs)} >
                            Log in !
                        </Button>

                        <h5 className="mt-3 mx-3">Don't have an account? </h5>
                        <h4><Link to="/signup" className="callToActionFormulario">Sign up </Link></h4>
                    </form>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = {
    loguearUsuario: authActions.loguearUsuario
}

export default connect(null, mapDispatchToProps)(withStyles(estilos)(LogIn))