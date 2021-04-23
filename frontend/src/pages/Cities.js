
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles'
import { useEffect } from 'react'
import CiudadesFiltradas from '../components/CiudadesFiltradas'

import EsqueletoCiudadesFiltradas from '../components/EsqueletoCiudadesFiltradas'

import {connect} from 'react-redux'
import citiesAction from '../redux/actions/citiesActions'

const useStyle = makeStyles({
    textField: {
        backgroundColor: "white",
        width: "80%",
        borderRadius:"5px",
        "&.Mui-focused": {
            border: "2px solid red",
        }
    },
    
    formulario: {
        width: "100%"
    }
});

const Cities = (props) => {
    const misEstilos = useStyle();

    /*Este solo se ejecutara al montar ,luego del "render"*/
    useEffect(() => {
        if(!props.estadoCities.ciudades){
            props.cargarCiudades();
        }
        // eslint-disable-next-line
    }, []);

    

    if (!props.estadoCities.loading && props.estadoCities.todasLasCiudades.length === 0) {
        return (
            <div className="contenedorCities mt-3 px-5">
                <h1 >Ups, there has been an error, please reload the page or contact us</h1>
            </div>
        )
    }
    return (
        <div className="contenedorCities">
            <div className="portadaCities " style={{ backgroundImage: "url(./assets/portadaCities.jpg)" }}>
                <div className="portaTituloFiltradorCities" >
                    <h1>The best experiences, activities and destinations</h1>
                    {<TextField className={`${misEstilos.textField} mt-3 `} label="Find your City" variant="filled" onChange={(e) => props.modificarCiudadesAMostrar(e.target.value)} />}
                </div>
            </div>
            {props.estadoCities.loading ? <EsqueletoCiudadesFiltradas /> :
                <CiudadesFiltradas ciudades={props.estadoCities.ciudadesAMostrar} />
            }

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        estadoCities : state.citiesReducer,
    }
}

const mapDispatchToProps = {
    cargarCiudades: citiesAction.obtenerCiudades, //esto es la referencia a una funcion
    modificarCiudadesAMostrar :  citiesAction.obtenerCiudadesAMostrar

}

export default connect(mapStateToProps,mapDispatchToProps)(Cities);