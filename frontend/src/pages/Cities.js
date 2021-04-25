
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import CiudadesFiltradas from '../components/CiudadesFiltradas';
import EsqueletoCiudadesFiltradas from '../components/EsqueletoCiudadesFiltradas';
import {connect} from 'react-redux';
import citiesAction from '../redux/actions/citiesActions';
import {Redirect} from 'react-router-dom';
const useStyle = makeStyles({
    textField: {
        backgroundColor: "white",
        width: "80%",
        borderRadius:"5px",
        "&.Mui-focused": {
            border: "2px solid red",
        }
    },
});

const Cities = ({estadoCities,cargarCiudades,modificarCiudadesAMostrar,restaurarEstadoInicial}) => {
    const misEstilos = useStyle();
     
    /*Este solo se ejecutara al montar ,luego del "render"*/
    useEffect(() => {
        if(estadoCities.todasLasCiudades.length === 0){
            cargarCiudades();
        }
        // eslint-disable-next-line
    }, []);

    //componenteWillUnmount()
    useEffect(()=>{
        return ()=>{
            if(estadoCities.error500) restaurarEstadoInicial();
        }
        // eslint-disable-next-line
    },[])
    
    if (estadoCities.error500) {
        return (
            <div className="contenedorCities mt-3 px-5">
                <Redirect to ="error500" />
            </div>
        )
    }

    return (
        <div className="contenedorCities">
            <div className="portadaCities " style={{ backgroundImage: "url(./assets/portadaCities.jpg)" }}>
                <div className="portaTituloFiltradorCities" >
                    <h1>The best experiences, activities and destinations</h1>
                    {<TextField className={`${misEstilos.textField} mt-3 `} label="Find your City" variant="filled" onChange={(e) => modificarCiudadesAMostrar(e.target.value)} />}
                </div>
            </div>
            {estadoCities.loading ? <EsqueletoCiudadesFiltradas /> :
                <CiudadesFiltradas ciudades={estadoCities.ciudadesAMostrar} />
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
    cargarCiudades: citiesAction.obtenerCiudades,//esto es la referencia a una funcion 
    modificarCiudadesAMostrar :  citiesAction.obtenerCiudadesAMostrar,
    restaurarEstadoInicial: citiesAction.restaurarEstadoInicial
}

export default connect(mapStateToProps,mapDispatchToProps)(Cities);