
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey';
import {useEffect, useState} from 'react'
import CiudadesEncontradas from '../components/CiudadesEncontradas'
import axios from 'axios'
const useStyle = makeStyles({
    textField : {
        backgroundColor: grey[300],
        width: "80%"
    },
    formulario:{
        width:"100%"
    }
});

const Cities = () =>{
    const misEstilos = useStyle();
    const [estado,setEstado] =  useState({
        ciudadesAMostrar:[],
        todasLasCiudades : [],   
        loading:true
    });

     

    /*Este solo se ejecutara al montar ,luego del "render"*/
    useEffect(()=>{
        axios.get('http://localhost:4000/api/cities')
        .then(response => {
            setEstado({
                loading:false,
                todasLasCiudades : response.data.respuesta,
                ciudadesAMostrar : response.data.respuesta,
            })
        }) 
    },[]);

    function obtenerCadenaMinusculaSinEspacios(unaCadena){
        //saco los espacios y transformo todo a minuscula
        return unaCadena.split(" ").join("").toLowerCase();
    }

    const inputBuscador = document.getElementById("buscador");

    function actualizarCiudades(){
        let inputValor = inputBuscador.value;        
        inputValor = obtenerCadenaMinusculaSinEspacios(inputValor);
        if(inputValor === ""){
            setEstado({
                ...estado,
                ciudadesAMostrar: estado.todasLasCiudades
            })
            return ;
        }
            
        let nuevasCiudades = estado.todasLasCiudades.filter(ciudad => {
            return obtenerCadenaMinusculaSinEspacios(ciudad.nombreCiudad).startsWith(inputValor) ;
        });
        setEstado({
            ...estado,
            ciudadesAMostrar : nuevasCiudades
        })
    }
    
    return(
        <div className ="contenedorCities">
            
            {estado.loading && <h1>Loading</h1>}
            <div className ="portadaCities " style ={{backgroundImage : "url(./assets/portadaCities.jpg)"}}>
                <div className="portaTituloBuscadorCities" >
                <h1>The best experiences, activities and destinations</h1>
                <form className={`${misEstilos.formulario} mt-3 pt-3`}  noValidate autoComplete="off">
                    <TextField className={misEstilos.textField} id="buscador" label="Find your City" variant="outlined" onKeyUp = {actualizarCiudades} />
                </form>
                </div>
            </div>
            
            <CiudadesEncontradas  ciudadesEncontradas ={estado.ciudadesAMostrar} />        
        </div>
    )
}
export default Cities;