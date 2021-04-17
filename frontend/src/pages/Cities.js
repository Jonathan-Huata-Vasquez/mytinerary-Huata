
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey';
import { useEffect, useState } from 'react'
import CiudadesFiltradas from '../components/CiudadesFiltradas'
import axios from 'axios'
import EsqueletoCiudadesFiltradas from '../components/EsqueletoCiudadesFiltradas'

const useStyle = makeStyles({
    textField: {
        backgroundColor: grey[300],
        width: "80%"
    },
    formulario: {
        width: "100%"
    }
});

const Cities = () => {
    const misEstilos = useStyle();
    const [estado, setEstado] = useState({
        ciudadesAMostrar: [],
        todasLasCiudades: [],
        loading: true
    });

    /*Este solo se ejecutara al montar ,luego del "render"*/
    useEffect(() => {

        axios.get('http://localhost:4000/api/cities')
            .then(response => {
                setEstado({
                    loading: true,
                    todasLasCiudades: response.data.respuesta,
                    ciudadesAMostrar: response.data.respuesta,
                    textoFiltrador: "",
                })
            })
            .catch(e => setEstado({
                ...estado,
                loading: true
            }))
        //esto es para que no me tire un warning de que 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function obtenerCadenaMinusculaSinEspacios(unaCadena) {
        //saco los espacios del inicio y final y transformo todo a minuscula
        return unaCadena.trim().toLowerCase();
    }
    
    function actualizarCiudades(e) {
        let inputValor = e.target.value;
        inputValor = obtenerCadenaMinusculaSinEspacios(inputValor);
        if (inputValor === "") {
            setEstado({
                ...estado,
                ciudadesAMostrar: estado.todasLasCiudades
            })
            return;
        }
        let nuevasCiudades = estado.todasLasCiudades.filter(ciudad => {
            return obtenerCadenaMinusculaSinEspacios(ciudad.nombreCiudad).startsWith(inputValor);
        });
        setEstado({
            ...estado,
            ciudadesAMostrar: nuevasCiudades,
            //textoFiltrador : inputValor
        })
    }

    if (!estado.loading && estado.todasLasCiudades.length === 0) {
        return <h1>No hay ciudades</h1>
    }
    return (
        <div className="contenedorCities">
            <div className="portadaCities " style={{ backgroundImage: "url(./assets/portadaCities.jpg)" }}>
                <div className="portaTituloFiltradorCities" >
                    <h1>The best experiences, activities and destinations</h1>
                    <TextField className={ `${misEstilos.textField} mt-3 `} label="Find your City" variant="outlined" onChange={actualizarCiudades} />
                </div>
            </div>
            {console.log(estado.loading)}
            {estado.loading ?  <EsqueletoCiudadesFiltradas /> :
                <CiudadesFiltradas ciudades={estado.ciudadesAMostrar} />
            }

        </div>
    )
}
export default Cities;