import React from 'react'

//material-ui
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom'
import axios from 'axios';
import authActions from '../redux/actions/authActions'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login';
import {mostrarTostada} from '../helpers/tostadas'
import { CircularProgress } from '@material-ui/core';
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

class SignUp extends React.Component {

    state = {
        loading: true,
        errorPaises500: false,
        visibleContrasena: false,
        paises: [],
        valoresInputs: {
            nombre: "",
            apellido: "",
            email: "",
            contrasena: "",
            usuarioAvatar: "",
            pais: ""
        },
        error:{
            nombre: "",
            apellido: "",
            email: "",
            contrasena: "",
            usuarioAvatar: "",
        }
    }

    iterableSetError(propiedad, valor){
        //setState(updater, [callback])
        // La salida del updater se fusiona de forma superficial (shallow) con state.
        this.setState(estadoActual =>{
            return {
                error: {
                    ...estadoActual.error,
                    [propiedad]:valor
                }
            }
        })
    }
    componentDidMount() {
        axios.get("https://restcountries.eu/rest/v2/all")
            .then(res => this.setState({
                ...this.state,
                loading: false,
                paises: res.data.map(pais => pais.name)
            }))
            .catch(error => this.setState({
                ...this.state,
                loading: false,
                errorPaises500: true,
            }))
    }

    cambiarVisibilidadContrasena() {
        this.setState({
            ...this.state,
            visibleContrasena: !this.state.visibleContrasena
        })

    }
    leerInput(e) {
        this.setState({
            ...this.state,
            valoresInputs: {
                ...this.state.valoresInputs,
                [e.target.name]: e.target.value
            }
        })
    }

   async enviar(objUsuario,conGoogle = false) {
        if(!conGoogle){
            let campos = Object.keys(this.state.valoresInputs);
            let hayCamposVacios = false;
            //
            campos.forEach(campo =>{
                const estaVacio =  campo !=="pais" && objUsuario[campo] === "" ;
                hayCamposVacios =  estaVacio ? true : hayCamposVacios;
                this.iterableSetError(campo,estaVacio ? "This field is required" : "")
            })
            if (hayCamposVacios) return null;
        }

        //Veo si hay erroes del backend
        let errores = await this.props.crearUsuario({
            ...objUsuario,
            nombre: objUsuario.nombre.trim(),
            apellido: objUsuario.apellido.trim()
        },conGoogle);

        if(errores){
            if(conGoogle){
                
                mostrarTostada("error",errores[0].message,"top-right");
            }
            else{
                errores.forEach(unError=> this.iterableSetError(unError.label,unError.message))
            }
        }   
    }
    respuestaGoogle(response){
        //en caso de que el usuario cierre el popup
        if(!response.profileObj) return null;
        
        const usuarioGoogle = response.profileObj
        this.enviar({
            nombre: usuarioGoogle.givenName,
            apellido:usuarioGoogle.familyName,
            email: usuarioGoogle.email,
            contrasena:"google"+ usuarioGoogle.googleId +"myTinerary",
            usuarioAvatar: usuarioGoogle.imageUrl,
            pais: ""
        },true)
    }
    
    render() {
        const { classes: misEstilos } = this.props //me traen los estilos como classes
        if (this.state.loading) {
            return (
                <div className="contenedorSignUp">
                    {this.state.errorPaises500 
                    ?<h1>Ups, please reload the page</h1> 
                    :<div className ="pantallaDeCarga">
                        <h1>Loading...</h1>
                        <CircularProgress size={100}/>
                    </div>
                    
                    }
                </div>
            )
        }

        return (
            <div className="contenedorSignUp">
                <h2>Create your account</h2>
                <div className="contenedorFormularioBtnGoogle">
                    
                    <GoogleLogin
                        className ="btnGoogle"
                        clientId="862112560567-1fkle8p1l585tr29kq4fef3ksjmo2fv6.apps.googleusercontent.com"
                        buttonText="Sign up"
                        onSuccess={(response)=>this.respuestaGoogle(response)}
                        onFailure={(response)=>this.respuestaGoogle(response)}
                        cookiePolicy={'single_host_origin'}
                        render={renderProps => (
                            <Button
                                onClick ={renderProps.onClick}
                                className={misEstilos.btnGoogle}
                                variant="contained"
                                startIcon={<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fillRule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path><path fill="none" d="M0 0h18v18H0z"></path></g></svg>}
                            >  
                                Sign up with Google  
                            </Button>    
                        )}
                    />

                    <div className="separador">
                        <h5>Or</h5>
                    </div>

                    <form className="formulario">

                        <TextField
                            error = {this.state.error.nombre === "" ? false:true}
                            name="nombre"
                            label="First name"
                            variant="outlined"
                            className={misEstilos.inputEstilo}
                            onChange={(e) => this.leerInput(e)}
                            value={this.state.valoresInputs.nombre}
                            helperText= {this.state.error.nombre}
                            size="small"
                        />
                        <TextField
                            error = {this.state.error.apellido === "" ? false:true}
                            helperText= {this.state.error.apellido}
                            name="apellido"
                            label="Last name"
                            variant="outlined"
                            onChange={(e) => this.leerInput(e)}
                            value={this.state.valoresInputs.apellido}
                            className={misEstilos.inputEstilo}
                            size="small"
                        />
                        <TextField
                            error = {this.state.error.email === "" ? false:true}
                            helperText= {this.state.error.email}
                            name="email"
                            label="Email"
                            variant="outlined"
                            onChange={(e) => this.leerInput(e)}
                            value={this.state.valoresInputs.email}
                            className={misEstilos.inputEstilo}
                            size="small"
                        />
                        <FormControl 
                            variant="outlined" 
                            className={misEstilos.inputEstilo} 
                            error = {this.state.error.contrasena === "" ? false:true}
                            size="small"
                        >
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput
                                
                                autoComplete="off"
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
                            <FormHelperText id="component-error-text">{this.state.error.contrasena}</FormHelperText>
                        </FormControl>
                        <TextField
                            size="small"
                            error = {this.state.error.usuarioAvatar === "" ? false:true}
                            helperText= {this.state.error.usuarioAvatar}
                            name="usuarioAvatar"
                            label="Enter the URL of your picture"
                            variant="outlined"
                            onChange={(e) => this.leerInput(e)}
                            value={this.state.valoresInputs.usuarioAvatar}
                            className={misEstilos.inputEstilo}
                        />
                        <FormControl variant="outlined" className={misEstilos.inputEstilo} size="small">
                            <InputLabel >Country</InputLabel>
                            <Select
                                name="pais"
                                label="Country"//reserva espacio para el label
                                value={this.state.valoresInputs.pais}
                                onChange={(e) => this.leerInput(e)}
                            >
                                <MenuItem  value={""}>...</MenuItem>
                                {this.state.paises.map(pais => {
                                    return <MenuItem key={pais} value={pais}>{pais}</MenuItem>
                                })}
                            </Select>
                        </FormControl>

                        <Button variant="contained" color="primary" className="mt-3" onClick={() => this.enviar(this.state.valoresInputs)}>
                            Sign Up !
                        </Button>

                        <h5 className="mt-3 mx-3">Have an account? </h5>
                        <h4><Link to="/login" className="callToActionFormulario">Log in now</Link></h4>
                    </form>
                </div>
                
            </div>
        )
    }
}

const mapDispatchToProps = {
    crearUsuario: authActions.crearUsuario
}

export default connect(null, mapDispatchToProps)(withStyles(estilos)(SignUp))

/*




*/